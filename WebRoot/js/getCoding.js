function geoCoding(eac,fuu){
          var eacs = new Array();
            $.ajax({
            	type:"post",
            	dataType: "json",
				url : "http://www.yxgis.com/apijs/getCoding",
				data:{"eac":eac},
				traditional: true,//属性在这里设置
				success : function(datas){
                  	fuu(datas);
               	}						
			 });          
        }