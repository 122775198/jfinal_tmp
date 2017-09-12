package com.wise.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wise.tool.Md5Utils;

public class UserLoginController extends Controller {

	@Clear
	public void index() {
		renderJsp("/login.jsp");
	}

	@Clear
	public void login() {
	
	}
	
	
	/**
	 * 获取权限配置信息
	 */
	public void getAuthorityInfo() {
		renderJson(getSession().getAttribute("purview"));
	} 
}
