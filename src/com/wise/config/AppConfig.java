package com.wise.config;

import java.io.IOException;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;
import com.jfinal.plugin.activerecord.dialect.OracleDialect;
import com.jfinal.plugin.cron4j.Cron4jPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.JspRender;
import com.jfinal.render.ViewType;
import com.jfinal.template.Engine;
import com.wise.controller.UserLoginController;


public class AppConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		me.setDevMode(true);
		me.setEncoding("utf-8");
		me.setViewType(ViewType.JSP);
		PropKit.use("jdbc.properties");
		JspRender.setSupportActiveRecord(true);
	}

	@Override
	public void configRoute(Routes me) {
		me.add("/", UserLoginController.class);//登录
	}
 
	@Override
	public void configEngine(Engine me) {


	}

	@Override
	public void configPlugin(Plugins me) {
		DruidPlugin druidPlugin = new DruidPlugin(PropKit.get("jdbc.url"), PropKit.get("jdbc.username"),
				PropKit.get("jdbc.password"), PropKit.get("jdbc.driverClassName"));
		
		druidPlugin.setInitialSize(1);
		druidPlugin.setMaxActive(2);
		druidPlugin.setMinIdle(1);
		
		me.add(druidPlugin);
		
		ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
		arp.setDialect(new OracleDialect());
		arp.setContainerFactory(new CaseInsensitiveContainerFactory());
		arp.setBaseSqlTemplatePath(PathKit.getRootClassPath());
		arp.setShowSql(true);
		me.add(arp);

//		_MappingKit.mapping(arp);

	}

	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub

	}

	@Override
	public void configHandler(Handlers me) {
		// TODO Auto-generated method stub

	}
	public static void main(String[] args) throws IOException {
		JFinal.start("WebRoot", 8080, "/tmp");
	}

}
