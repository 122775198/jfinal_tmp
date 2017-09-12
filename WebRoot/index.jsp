<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>金葵网络分中心</title>
    <link rel="stylesheet" href="./css/base.css">
    <link rel="stylesheet" href="./fonts/iconfont.css">
    <link rel="stylesheet" href="./css/index.css">
    <script>
    
    	var tabStyle = {

    			getAside: function(oriDivP,newDivP,oriLiP,newLiP){ //iframe样式控制
    				
    				$('.ordinary').eq(oriDivP).find('.nav-title').removeClass('open');
    				$('.ordinary').eq(newDivP).find('.nav-title').addClass('open');
    				$('.ordinary').eq(oriLiP).find('ul').removeClass('on');
    				$('.ordinary').eq(newLiP).find('ul').addClass('on');
    			},
    			clickSetiframesrc: function(fp,lp){ //点击某个li进行触发  fp:第几个爸爸 lp:第几个li
    				
    				$('.ordinary').eq(fp).find('ul li').eq(lp).click();
    				
    			}
    	}
    </script>	
</head>
<body>
<!--头部 start-->
<header>
    <section class="banner clearfix">
        <div class="header-left fl clearfix">
            <h1 style="margin-left: 10px;">  金桥镇城镇综合管理平台
                <span class="version">V1.0</span>
            </h1>
        </div>

        <div class="header-right fr clearfix">
            <p class="manager fl">
                <span class="iconfont icon-guanliyuan"></span>
                欢迎您：管理员
            </p>
            <a class="logout" href="login.jsp">退出</a>
        </div>
    </section>
</header>
<!--头部 end-->

<section class="banner content">
    <!--侧边导航 start-->
    <nav>
        <aside class="ordinary" >
            <div class="nav-title clickable bc-change">
                <i class="iconfont icon-shouyeshouye"></i>
                <span>首页</span>
            </div>
        </aside>

        <!--个人办公-->
        <aside class="ordinary" >
            <div class="nav-title open sub">
                <i class="iconfont icon-bangong"></i>
                <span>社区区块管理</span>
            </div>
            <ul class="subnav on">
                <li class="clickable bc-change" onclick="setiframesrc('singleWorkTable')">社区区块管理</li>
                <li class="clickable" onclick="setiframesrc('/tm/singleOAPage/mobileList.jsp')">区块走访进度</li>
                <li class="clickable" onclick="setiframesrc('notification')">区块事件登记</li>
                <!-- <li class="clickable" onclick="setiframesrc('singleOAPage')">值班安排</li> -->
                <li class="clickable" onclick="setiframesrc('rotaManage')">居民来访登记</li>
                <li class="clickable" onclick="setiframesrc('rotaManage')">社区信息检索</li>
                <li class="clickable" onclick="setiframesrc('rotaManage')">社工日常考核</li>
            </ul>
        </aside>

        <!--重点事件督办-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-zhongdian"></i>
                <span>商铺区块管理</span>
            </div>
            <ul class="subnav">
  				<li class="clickable" onclick="setiframesrc('eventRegister/index')">商铺区块管理</li>
                <li class="clickable" onclick="setiframesrc('eventRegister/indexSupervise')">商铺信息采集</li>
                <li class="clickable" onclick="setiframesrc('eventRegister/indexRetroaction')">区块事件登记</li>
                <li class="clickable" onclick="setiframesrc('eventRegister/indexSelectevent')">商铺信息搜索</li>
            </ul>
        </aside>

        <!--五违整治-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-wei"></i>
                <span>城镇运行管理</span>
            </div>
        </aside>

        <!--河道整治-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-152hangdao"></i>
                <span>网格中心辅助管理</span>
            </div>
            <ul class="subnav">
                <li class="clickable"  onclick="setiframesrc('riverRoad')">网格中心资源台账</li>
                <li class="clickable"  onclick="setiframesrc('leaderBaseInfo')">交接班</li>
                <li class="clickable"  onclick="setiframesrc('complaintEvent')">值班安排</li>
                <!-- <li class="clickable"  onclick="setiframesrc('riverRoadLeader')">河道河长信息管理</li> -->
                <li class="clickable"  onclick="setiframesrc('riverRoad/riverRoadManage.jsp')">电子便签</li>
            </ul>
        </aside>
        
        <!--防汛防台-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-wlf"></i>
                <span>社区服务子系统</span>
            </div>
            <ul class="subnav">
                <li class="clickable"  onclick="setiframesrc('disasterUnit')">社区服务资源管理</li>
                <li class="clickable"  onclick="setiframesrc('conductor')">重点关怀人员管理</li>
  <!--               <li class="clickable" onclick="setiframesrc('/tm/floodControl/workRecord')">防汛防台工作记录</li> -->
                <li class="clickable" onclick="setiframesrc('disasterArea')">社区救助服务管理</li>
            </ul>
        </aside>

        <!--领导驾驶舱-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-pilaojiashi"></i>
                <span>领导驾驶舱</span>
            </div>
            <ul class="subnav">
               <li class="clickable" onclick="setiframesrc('leadCockpit/index')">领导驾驶舱</li>
            </ul>
        </aside>

        <!--中心数据库-->
        <aside class="ordinary">
            <div class="nav-title sub">
                <i class="iconfont icon-serverrole"></i>
                <span>城镇综合数据分析</span>
            </div>
            <ul class="subnav">
                <li class="clickable" onclick="setiframesrc('centerDataPlace')">人口数据分析</li>
                <li class="clickable" onclick="setiframesrc('centerDataMatter')">企业信息分析</li>
                <li class="clickable" onclick="setiframesrc('eventInfo/index')">事件数据分析</li>
				<li class="clickable" onclick="setiframesrc('eventInfo/index')">数据立方</li>
            </ul>
        </aside>

    </nav>
    <!--侧边导航 end-->

    <!--页面嵌套部分 start-->
    <div class="panel-main" style="background-color: beige">
        <iframe id="iframe" src="./wwpage/ww.jsp">

        </iframe>
    </div>
    <!--页面嵌套部分 end-->
</section>

<script src="./js/jquery.min.js"></script>
<script>
function setiframesrc(src){
   	$("iframe").attr("src",src);
 }


    $(function () {
        /*
         点击侧边栏交互展现
         */
        $(".nav-title").on('click', function () {
            $(this).parent().siblings().find('.nav-title').removeClass('open').next().removeClass('on')
                .end().end().end().end().toggleClass("open").next().toggleClass("on");
        });

        /*
         子侧边栏选中样式
         */
        $(".clickable").on('click', function () {
            $(".clickable").removeClass("bc-change");
            $(this).addClass("bc-change");
            $("#iframe").attr("src",$(this).attr("src"));
        });

        /*
         GIS列表按钮样式切换
         */
        $('.change-btn').on('click', function () {
            $(this).siblings().removeClass("bc-change")
                .end().addClass("bc-change");
        });
        
       

        /*
         阻止浏览器F5默认刷新
         */
        $('html').on('keydown', function (e) {
            if (e.keyCode == 116) {
                e.preventDefault();
                var iframeSrc = iframe.src;
                $("#iframe")[0].src = iframeSrc;
            }
        })
    });
</script>
</body>
</html>