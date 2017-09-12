<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>金葵网格分中心综合管理平台</title>
    <link rel="stylesheet" href="./css/base.css">
    <link rel="stylesheet" href="./fonts/iconfont.css">
    <link rel="stylesheet" href="./css/login.css">
</head>
<body>
    <div class="layout">
        <!--头部 start-->
        <header class="header">
            <img src="./imgs/bt.png" alt="">
        </header>
        <!--头部 end-->

        <!--登录框 start-->
        <section class="login-wrapper">
        <form action="login" method="post">
            <div class="input-wrapper">
                <label>用户名</label>
                <div class="input-box">
                    <input id="user" name="username" class="input selected" type="text">
                    <span class="iconfont icon-icon"></span>
                    <span class="iconfont icon-quxiao delete"></span>
                </div>
            </div>

            <div class="input-wrapper">
                <label>密码</label>
                <div class="input-box">
                    <input id="pw" name="password" class="input" type="password">
                    <span class="iconfont icon-mima"></span>
                    <span class="iconfont icon-quxiao delete"></span>
                </div>
            </div>
            <div style="font-size: 16px;color:red;text-align: center;margin-top: 5px" >${msg}</div>
            <input id="btn" class="confirm" type="submit" value="登录">
            </form>
        </section>
        <!--登录框 end-->
    </div>

    <script src="./js/jquery-1.10.2.min.js"></script>
    <script>
        $(function () {

            $('#user').focus();

            $('body').on('focus', '.input', function () {
                // 输入框被选中事件，控制被选中样式
                $('.input').removeClass('selected');
                $(this).addClass('selected');
            }).on('keyup', '.input', function () {
                // 输入框键盘弹起事件，控制删除按钮是否显示
                var value = $(this).val();
                if(value){
                    $(this).siblings('.icon-quxiao').show();
                } else {
                    $(this).siblings('.icon-quxiao').hide();
                }
            }).on('click', '.delete', function () {
                // 删除按钮点击事件，清除所在输入框中的文本
                $('.input').removeClass('selected');
                $(this).hide().prev().prev().val('').addClass('selected').focus();
            }).on('click', '#btn', function () {
                // 登录验证
                var txt = $('#user').val();
                var pw = $('#pw').val();
                if (txt === '' || pw === '') {
                    alert('请输入您的用户名或密码');
                    return false;
                }
            });
        });
    </script>
</body>
</html>