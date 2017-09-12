/**
 * 权限管理js
 */

function authority(){
	$.ajax({
		type:"post",
		url:"/tm/getAuthorityInfo",
		success:function(msg){
			for(var key in msg){
				//console.log(key)
				var obj=$("a[mlgb='"+key+"']");
				if(obj.length>0&&msg[key]=="TRUE"){	
					$(obj).each(function(){
						//this.remove();
						$(this).show();
					});
				}
			}
		}
	});	
}