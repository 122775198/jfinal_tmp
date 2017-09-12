$(function() {
//	$('#addBlockEvent').on('show.zui.modal', function(info) {
//		$.ajax({
//			type : "POST",
//			url : "blockevent!addevent",
//			async : false,
//			success : function(msg) {
//				$("#addevent").html($(msg).find("#addevent").html())
//				$("#cancelbtn").show();
//				$("#savebtn").show();
//				$("#closebtn").hide();
//				// $("#addBlockEvent").show(100);
//			}
//		});
//	});
/*	$(".form_datetime").datetimepicker({
		language : 'zh-CN',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		forceParse: 0,
	    showMeridian: 1,
		format : 'yyyy-mm-dd hh:ii'
	});*/
});


//function modalBind(){
//	$('#triggerModal').on('hide.zui.modal', function() {
//		  alert('对话框已显示。');
//		})
//}

function pagereload(){
	window.location.reload();
}

function initPagination(total, page) {
/*	$(".M-box").createPage({
		pageCount : total,
		current : page,
		backFn : function(p) {
			$("#page").val(p);
			var fm = $("#actionform");
			fm.submit();
		}
	});*/
	
    $('.M-box').pagination({coping:false,current:page,totalData:total,showData:10,
        callback:function(index){
			$("#page").val(index.getCurrent());
			var fm = $("#actionform");
			fm.submit();
        }
    });
}

// 添加事件方法
// function addevent(){
// $.ajax({
// type:"POST",
// url:"blockevent!addevent",
// async:false,
// success:function(msg){
// $("#addevent").html($(msg).find("#addevent").html())
// $("#cancelbtn").show();
// $("#savebtn").show();
// $("#closebtn").hide();
// $("#addBlockEvent").show(100);
// }
// });
// }

function hidedialog(name) {
	$("#" + name + "BlockEvent").hide(100);
	$("#" + name + "form")[0].reset();
}

function functionChange(obj, divname) {
	$("#" + divname).find("#function").hide();
	$("#" + divname).find("#dept").hide();
	if ($(obj).val() == 2) {
		$("#" + divname).find("#function").show();
	}
	if ($(obj).val() == 4) {
		$("#" + divname).find("#dept").show();
	}
}

// 模糊查询居委房屋
function showhouseForjuwei(text) {
	if ($(text).val().length > 0) {
		$
				.ajax({
					type : "POST",
					url : "visitevent!houselist",
					data : "houseName=" + $(text).val(),
					async : false,
					success : function(msg) {
						var json = eval('(' + msg + ')');
						$("#housebody").text("");
						$(json)
								.each(
										function() {
											$("#housebody")
													.append(
															"<tr id='housetr' style='height:25px;font-size:14px;width: 100%;text-align: left;margin-left:20px;;' onclick='setHouse(&quot;"
																	+ this.id
																	+ "&quot;,&quot;"
																	+ this.name
																	+ "&quot;)'><td>"
																	+ this.name
																	+ "</td></tr>");
										});
						$("#searchDiv").show();
					}
				});
	} else {
		$("#searchDiv").hide();
	}
}
function setHouse(id, name) {
	$("#searchDiv").hide();
	$("#housename").val(name);
	$("#houseid").val(id);
}
//模糊查询区块房屋
function showpeopleForblock(text) {
	if ($(text).val().length > 0) {
		var houseName=document.getElementById("housename").value;
		$
				.ajax({
					type : "POST",
					url : "blockevent!peoplelist",
					data : "houseName=" + houseName+
					"&peopleName="+ $(text).val(),
					async : false,
					success : function(msg) {
						var json = eval('(' + msg + ')');
						$("#peoplebody").text("");
						$(json)
								.each(
										function() {
											$("#peoplebody")
													.append(
															"<tr id='housetr' style='height:25px;font-size:14px;width: 100%;text-align: left;margin-left:20px;;' onclick='setPeople(&quot;"
																	+ this.id
																	+ "&quot;,&quot;"
																	+ this.name
																	+ "&quot;)'><td>"
																	+ this.name
																	+ "</td></tr>");
										});
						$("#searchDiv1").show();
					}
				});
	} else {
		$("#searchDiv1").hide();
	}
}
function setPeople(id, name) {
	$("#searchDiv1").hide();
	$("#DwellerName").val(name);
	$("#Dwellerid").val(id);
}
//模糊查询区块房屋
function showpeopleForblock(text) {
	if ($(text).val().length > 0) {
		var houseName=document.getElementById("housename").value;
		$
				.ajax({
					type : "POST",
					url : "blockevent!peoplelist",
					data : "houseName=" + houseName,
					async : false,
					success : function(msg) {
						var json = eval('(' + msg + ')');
						$("#peoplebody").text("");
						$(json)
								.each(
										function() {
											$("#housebody")
													.append(
															"<tr id='housetr' style='height:25px;font-size:14px;width: 100%;text-align: left;margin-left:20px;;' onclick='setPeople(&quot;"
																	+ this.id
																	+ "&quot;,&quot;"
																	+ this.name
																	+ "&quot;)'><td>"
																	+ this.name
																	+ "</td></tr>");
										});
						$("#searchDiv1").show();
					}
				});
	} else {
		$("#searchDiv1").hide();
	}
}

function setPeople(id, name) {
	$("#searchDiv1").hide();
	$("#DwellerName").val(name);
	$("#Dwellerid").val(id);
}
// 处理页面
/*
 * function disposalEventInfo(id){ $.ajax({ type:"POST",
 * url:"blockevent!getdisposalevent", data:"eventid="+id, async:false,
 * success:function(msg){ $("#eventinfo").html($(msg).find("#eventinfo").html()) //
 * var json =eval('('+msg+')'); // // $("#sourceName").val(json.sourceName); //
 * $("#eventMemo").val(json.eventMemo); //
 * $("#DwellerName").val(json.dwellerName); //
 * $("#DwellerPhone").val(json.dwellerPhone); //
 * $("#thouseName").val(json.thouseName); // $("#thouseID").val(json.thouseID); //
 * $("#statusName").val(json.statusName); // // showEventLog(id);
 * 
 * 
 * $("#infoBlockEvent").show(100); } }); }
 */

// 详单页面
/*
 * function showEventInfo(id){ $.ajax({ type:"POST",
 * url:"blockevent!geteventInfo", data:"eventid="+id, async:false,
 * success:function(msg){ $("#eventinfo").html($(msg).find("#eventinfo").html()) //
 * var json =eval('('+msg+')'); // // $("#sourceName").val(json.sourceName); //
 * $("#eventMemo").val(json.eventMemo); //
 * $("#DwellerName").val(json.dwellerName); //
 * $("#DwellerPhone").val(json.dwellerPhone); //
 * $("#thouseName").val(json.thouseName); // $("#thouseID").val(json.thouseID); //
 * $("#statusName").val(json.statusName); // // showEventLog(id);
 * 
 * 
 * $("#infoBlockEvent").show(100); } }); }
 */

// function showEventLog(id){
// $("#eventlogDiv div").remove();
// $.ajax({
// type:"POST",
// url:"blockevent!geteventLog",
// data:"eventid="+id,
// async:false,
// success:function(msg){
// var json =eval('('+msg+')');
// for(var i=0;i<json.length;i++){
// $("#eventlogDiv").append("<div style='width: 98%;border: 1px solid
// gray;border-radius: 5px;margin:
// 5px;'>处理人:"+json[i].createName+"<br>处理时间:"+json[i].createDate+"<br>处理操作:"+json[i].statusName+"<br>处理方案:"+json[i].disposalInfo+"</div>")
// }
//				
// $("#infoBlockEvent").show(300);
// }
// });
// }
// function postEventInfo(id){
// $.ajax({
// type:"POST",
// url:"blockevent!geteventInfo",
// data:"eventid="+id,
// async:false,
// success:function(msg){
// var json =eval(''+msg+'');
// $("#infoBlockEvent").show(300);
// }
// });
// }
// 异步提交表单
function submitForm(formname) {
	$("#saveBtn").hide();
	var aoptions = {
		success : function(data) {
			console.log(typeof data);
			if (data == true) {
				$("#saveBtn").hide();
				$("#closeBtn").show();
				new $.zui.Messager('信息录入成功', {
					icon : 'bell',
					placement : 'center'
				}).show();
			}else{
				new $.zui.Messager('信息录入失败', {
					icon : 'bell',
					placement : 'center'
				}).show();
				
			}
		}
	};

	var doptions = {
		success : function(data) {
			if (data != "null") {
				var json = eval('(' + data + ')');
				if(json.eventStatus=="5"){
					$("#eventlogDiv").append("<div class='alert alert-success with-icon' style='font-size: 15px; line-height: 23px;'><i class='icon icon-check-board'></i><div class='content'>"+json.createName+"&nbsp;&nbsp;&nbsp;&nbsp;"+json.createDate+"<hr>处理操作:"+json.statusName+"<br>处理方案:"+(json.disposalInfo==undefined?" ":json.disposalInfo)+"</div></div>");
				}else{
					$("#eventlogDiv").append("<div class='alert with-icon' style='font-size: 15px; line-height: 23px;'><i class='icon icon-edit-sign'></i><div class='content'>"+json.createName+"&nbsp;&nbsp;&nbsp;&nbsp;"+json.createDate+"<hr>处理操作:"+json.statusName+"<br>处理方案:"+(json.disposalInfo==undefined?" ":json.disposalInfo)+"</div></div>");
				}
				
				$("#updatebtn").hide();
				new $.zui.Messager('事件处理成功', {
					icon : 'bell',
					placement : 'center'
				}).show();
			}else{
				new $.zui.Messager('事件处理失败', {
					icon : 'bell',
					placement : 'center'
				}).show();
			}
		}
	};

	$("#" + formname).ajaxSubmit(formname == "addform" ? aoptions : doptions);
	
	// $.ajax({
	// type:"POST",
	// url:"blockevent!saveevent",
	// data:$("#addform").serialize(),
	// async:false,
	// success:function(msg){
	// alert(111);
	// }
	// });
}