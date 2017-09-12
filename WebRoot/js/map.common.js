	// 地图API功能
	var map;
	//初始化地图对象
	map=new STMapObj("STMap_map");
	//根据中心点和级别定位地图,STMapPoint表示具备x/y属性的二维点对象
	map.locateMap(new STMapPoint(121.60160608673104,31.218707170125573),6);
	//设置放大缩小控件是否显示,默认显示
	map.setZoomCompVisible(false);
	//设置比例尺控件是否显示,默认显示
	map.setScaleCompVisible(false);
	function addMapPolyline(json){
		map.clearAllOverlays();
		map.locateMap(new STMapPoint(121.63077236126712,31.23997629701182),3);
		$(json).each(function(i,event){
			if(event.JUWEI_BORDER!=null){
			    var poly = new STMapPolyline();		   
	            poly.id="map_"+event.ID.toString(); //【必选】对象id
	            poly.strokeColor="#0078d7"; //【可选】线的颜色
	            poly.points=event.JUWEI_BORDER;
	            poly.strokeWeight=1//【可选】宽度
	            poly.strokeOpacity="1" //【可选】透明度
	            poly.dashStyle = "solid" //【可选】线形,所有可选线形请参考文档
	            poly.filled=true;//【可选】是否填充
	            poly.fillColor="#0078d7";//【可选】填充颜色,m 
	            poly.fillOpacity="0.5";//【可选】填充透明度
	            poly.autoClose=true; //【可选】是否自动闭合
	            poly.tooltip=event.SHORT_NAME;
	            poly.infowin=false;
	            var obj=new STMapCustomOverObj();
	            obj.id="label"+event.ID.toString(); //【必选】对象 id
	            obj.point=new STMapPoint(event.CENTER_X,event.CENTER_Y); //【必选】经纬度坐标,STMapPoint 类型的参数
                obj.html="<div>"+event.SHORT_NAME+"</div>";
                obj.anchor=new STMapPoint(0,0);
                obj.infowin=false;
                obj.size = new STMapSize(100,100);
                map.addOverlay(obj,false);
	            map.addOverlay(poly,false);
	            map.addObjEventListner(poly.id,"click",function(obj,x,y){
					var triggerOption = {
							type : 'ajax',
							url :'detail?ID=' + event.ID,
							size : 'lg',
							title : '居委信息'             
						};
						var newTrigger = new $.zui.ModalTrigger(triggerOption);
						newTrigger.show();
	            })
			}
		});
		
	}
	
	function addMapPolylineForJuWeiInfo(json){
		map.locateMap(new STMapPoint(121.62727476071163,31.24058172514209),3); //121.63987041424586,31.24577357067903
		$(json).each(function(i,event){
			if(event.JUWEI_BORDER != null){
				var poly = new STMapPolyline();		   
	            poly.id="map_"+event.ID.toString(); //【必选】对象id
	            poly.strokeColor="#0078d7"; //【可选】线的颜色
	            poly.points=event.JUWEI_BORDER;
	            poly.strokeWeight=1//【可选】宽度
	            poly.strokeOpacity="1" //【可选】透明度
	            poly.dashStyle = "solid" //【可选】线形,所有可选线形请参考文档
	            poly.filled=true;//【可选】是否填充
	            poly.fillColor="#0078d7";//【可选】填充颜色
	            poly.fillOpacity="0.5";//【可选】填充透明度
	            poly.autoClose=true; //【可选】是否自动闭合
	            poly.tooltip=event.SHORT_NAME;
	            poly.infowin=false;
	           /* var label=new STMapLabel();
	            label.id="label"+event.ID.toString(); //【必选】对象 id
	            label.point=new STMapPoint(event.CENTER_X,event.CENTER_Y); //【必选】经纬度坐标,STMapPoint 类型的参数
	            label.text=event.SHORT_NAME; //【必选】文本
	            label.fontSize="12px";
	            label.fontColor="#000000";
	            label.fontFamily="宋体";
	            label.fillColor="#0078d7";*/
	            var obj = new STMapCustomOverObj();
	            obj.id = event.ID.toString();
	            obj.point=new STMapPoint(event.CENTER_X,event.CENTER_Y);
	            obj.html="<div style='color: blue;'>"+event.SHORT_NAME+"</div>";
	            obj.infowin=false;
                obj.anchor=new STMapPoint(0,0);
                obj.size = new STMapSize(100,100);
                map.addOverlay(obj,false);
	           // map.addOverlay(label,false);
	            map.addOverlay(poly,false);
	            map.addObjEventListner(poly.id,"click",function(obj,x,y){
					var triggerOption = {
							type : 'ajax',
							url :'./centerDataPlace/juWeiDetailInfo?ID=' + event.ID.toString(),
							size : 'lg',
							title : '居委信息'             
						};
						var newTrigger = new $.zui.ModalTrigger(triggerOption);
						newTrigger.show();
	            })
			}
			
		});
	}
	
	function addMapPointForWuWeiTeam(json) {
		/*$(json).each(function(i,event){
		
		map.clearAllOverlays();
        map.geoCoding(event.TEAMADDRESS,function(x,y){
        var point=new STMapPoint(x,y);
    	  var pt=new STMapMarker();

                //设置点对象的坐标
            pt.point=point;

            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
            pt.id=event.id;
            pt.img="./images/ic_redpop.png";
            pt.size=new STMapSize(28,39); 
            pt.infowin=false;//关闭点击事件，手动给出
            //将该对象添加到地图上
            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
            map.addOverlay(pt,true); 
            map.addObjEventListner(pt.id,"click",function(obj,x,y){
				var triggerOption = {
						type : 'ajax',
						url :'./centerDataPlace/wuWeiTeamDetailInfo?ID=' + event.ID,
						size : 'lg',
						title : '五违巡查队信息'             
					};
					var newTrigger = new $.zui.ModalTrigger(triggerOption);
					newTrigger.show();
            })
        });
	});
	*/
	
	 var eac = new Array();
    	$(json).each(function(i,event){
    		map.clearAllOverlays();
    		eac[i]=event.TEAMADDRESS;   
		});
         var emv = geoCoding(eac,function(datas){
    		for(var i in datas){
    		  	for(var j in datas[i]){
    	     	      var pt=new STMapMarker();
    		            //设置点对象的坐标
    		            pt.point=new STMapPoint(datas[i][j].location.split(",")[0],datas[i][j].location.split(",")[1]);
    		            console.log(pt.point)
    		            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
    		            pt.id ="map_"+json[j].ID.toString();
    		            pt.img="./images/ic_redpop.png";
    		            pt.size=new STMapSize(28,39); 
    		            pt.infowin=false;//关闭点击事件，手动给出
    		            map.addObjEventListner(pt.id ,"click",function(obj,x,y){
    						var triggerOption = {
						type : 'ajax',
						url :'./centerDataPlace/wuWeiTeamDetailInfo?ID=' + json[j].ID.toString(),
						size : 'lg',
						title : '五违巡查队信息'             
					};
						var newTrigger = new $.zui.ModalTrigger(triggerOption);
						newTrigger.show();
    		            })
    		            //将该对象添加到地图上
    		            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
    		            map.addOverlay(pt,false); 
                }
    		  }	
    	})
    	
	}


	
	function addMapPointForFivePeccancy(json) {

		/*$(json).each(function(i,event){
			//map.clearAllOverlays();
			console.log(event.ADDRESS);
	        map.geoCoding(event.ADDRESS,function(x,y){
	        var point=new STMapPoint(x,y);
        	  var pt=new STMapMarker();

	                //设置点对象的坐标
	            pt.point=point;
	            
	            
	            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
	            pt.id="五违信息"+event.ID;
	            
	            	if (event.TYPE == '1') {

						pt.img = "./images/ic_redpop.png";

					} else if (event.TYPE == '2') {
						pt.img = "./images/ic_redpop1.png";
					} else if (event.TYPE == '3') {
						pt.img = "./images/ic_redpop2.png";
					} else {
						pt.img = "./images/ic_redpop3.png";
					}
	         
	            
	            pt.size=new STMapSize(28,39); 
	            pt.infowin=false;//关闭点击事件，手动给出
	            //将该对象添加到地图上
	            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
	            map.addOverlay(pt,true); 
	            
	            map.addObjEventListner(pt.id,"click",function(obj,x,y){
					var triggerOption = {
							type : 'ajax',
							url :'./centerDataPlace/getWuWeiDetailInfo?ID=' + event.ID,
							size : 'lg',
							title : '五违巡查队信息'             
						};
						var newTrigger = new $.zui.ModalTrigger(triggerOption);
						newTrigger.show();
	            })
	        });
		});*/
		
		 var eac = new Array();
    	$(json).each(function(i,event){
    		map.clearAllOverlays();
    		eac[i]=event.ADDRESS;   
		});
         var emv = geoCoding(eac,function(datas){
    		for(var i in datas){
    		  	for(var j in datas[i]){
    	     	      var pt=new STMapMarker();
    		            //设置点对象的坐标
    		            pt.point=new STMapPoint(datas[i][j].location.split(",")[0],datas[i][j].location.split(",")[1]);
    		            console.log(pt.point)
    		            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
    		            pt.id ="map_"+json[j].ID.toString();
    		            
    		            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
	           // pt.id="五违信息"+event.ID;
	            
	            	if (json[j].TYPE.toString() == '1') {

						pt.img = "./images/ic_redpop.png";

					} else if (json[j].TYPE.toString() == '2') {
						pt.img = "./images/ic_redpop1.png";
					} else if (json[j].TYPE.toString() == '3') {
						pt.img = "./images/ic_redpop2.png";
					} else {
						pt.img = "./images/ic_redpop3.png";
					}
    		            //pt.img="../images/ic_redpop.png";
    		            pt.size=new STMapSize(28,39); 
    		            pt.infowin=false;//关闭点击事件，手动给出
    		            
    		            map.addObjEventListner(pt.id ,"click",function(obj,x,y){
    		            	//console.log("aabbcc:::: "+obj.id.split("STMapOverLayObject")[0].substr(4,obj.id.split("STMapOverLayObject")[0].length - 4));
    						var triggerOption = {
							type : 'ajax',
							url :'./centerDataPlace/getWuWeiDetailInfo?ID=' + obj.id.split("STMapOverLayObject")[0].substr(4,obj.id.split("STMapOverLayObject")[0].length - 4),
							size : 'lg',
							title : '五违巡查队信息'             
						};
						var newTrigger = new $.zui.ModalTrigger(triggerOption);
						newTrigger.show();
    		            })
    		            //将该对象添加到地图上
    		            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
    		            map.addOverlay(pt,false); 
                }
    		  }	
    	})
    	
	}
		
	
	
	
	function addMapPointForMatter(json,flg) {
		/*$(json).each(function(i,event){
			map.clearAllOverlays();
	        map.geoCoding(event.DEPOTADDRESS,function(x,y){
	        var point=new STMapPoint(x,y);
        	  var pt=new STMapMarker();

	                //设置点对象的坐标
	            pt.point=point;

	            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
	            pt.id=event.id;
	            pt.img="./images/ic_redpop.png";
	            pt.size=new STMapSize(28,39); 
	            pt.infowin=false;//关闭点击事件，手动给出
	            //将该对象添加到地图上
	            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
	            map.addOverlay(pt,true); 
	            map.addObjEventListner(pt.id,"click",function(obj,x,y){
	            	if(flg == 2){
	            		var triggerOption = {
	            				type : 'ajax',
	            				url :'./centerDataMatter/wareHouseDetailInfo?ID=' + event.ID,
	            				size : 'lg',
	            				title : '防汛防台仓库物资信息'             
	            		};
	            		var newTrigger = new $.zui.ModalTrigger(triggerOption);
	            		newTrigger.show();
	            		
	            	}else{
	            		var triggerOption = {
	            				type : 'ajax',
	            				url :'./centerDataPlace/wareHouseAddressDetailInfo?ID=' + event.ID,
	            				size : 'lg',
	            				title : '防汛防台仓库信息'             
	            		};
	            		var newTrigger = new $.zui.ModalTrigger(triggerOption);
	            		newTrigger.show();
	            	}
	            	
	            	
	            })
	        });
		});*/
		
		
		 var eac = new Array();
$(json).each(function(i, event) {
	map.clearAllOverlays();
	eac[i] = event.DEPOTADDRESS;
});
var emv = geoCoding(eac, function(datas) {
	for(var i in datas) {
		for(var j in datas[i]) {
			var pt = new STMapMarker();
			//设置点对象的坐标
			pt.point = new STMapPoint(datas[i][j].location.split(",")[0], datas[i][j].location.split(",")[1]);
			//console.log(pt.point)
			//设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
			pt.id = "map_" + json[j].ID.toString();
			pt.img = "./images/ic_redpop.png";
			pt.size = new STMapSize(28, 39);
			pt.infowin = false; //关闭点击事件，手动给出
			map.addObjEventListner(pt.id, "click",function(obj, x, y) {
					if(flg == 2){
	            		var triggerOption = {
	            				type : 'ajax',
	            				url :'./centerDataMatter/wareHouseDetailInfo?ID=' + json[j].ID.toString(),
	            				size : 'lg',
	            				title : '防汛防台仓库物资信息'             
	            		};
	            		var newTrigger = new $.zui.ModalTrigger(triggerOption);
	            		newTrigger.show();
	            		
	            	}else{
	            		var triggerOption = {
	            				type : 'ajax',
	            				url :'./centerDataPlace/wareHouseAddressDetailInfo?ID=' + json[j].ID.toString(),
	            				size : 'lg',
	            				title : '防汛防台仓库信息'             
	            		};
	            		var newTrigger = new $.zui.ModalTrigger(triggerOption);
	            		newTrigger.show();
	            	}
				})
			//将该对象添加到地图上
			//参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
			map.addOverlay(pt, false);
		}
	}
})

}
	
	
	function addMapPoint(json) {
		map.clearAllOverlays();
	    var eac = new Array();
    	$(json).each(function(i,event){
    		eac[i]=event.ADDRESS;   
		});
         var emv = geoCoding(eac,function(datas){
    		for(var i in datas){
    		  	for(var j in datas[i]){
    		  		if(datas[i][j]!=null){
    	     	      var pt=new STMapMarker();
    		            //设置点对象的坐标
    		            pt.point=new STMapPoint(datas[i][j].location.split(",")[0],datas[i][j].location.split(",")[1]);
    		            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
    		            pt.id="map_"+json[j].ID.toString();
    		            pt.img="../images/ic_redpop.png";
    		            pt.size=new STMapSize(28,39); 
    		            pt.infowin=false;//关闭点击事件，手动给出
    		            map.addObjEventListner(pt.id,"click",function(obj,x,y){
    						var triggerOption = {
    								type : 'ajax',
    								url :'/tm/eventRegister/detail?id=' + obj.id.split("STMapOverLayObject")[0].substr(4,obj.id.split("STMapOverLayObject")[0].length-4 ),
    								size : 'lg',
    								title : '事件信息'             
    							};
    							var newTrigger = new $.zui.ModalTrigger(triggerOption);
    							newTrigger.show();
    		            })
    		            //将该对象添加到地图上
    		            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
    		            map.addOverlay(pt,false); 
    		  		}
                }
    		  }	
    	})
	}
	function addMapPointForProbe(json) {
		map.clearAllOverlays();
	    var eac = new Array();
    	$(json).each(function(i,event){
    		eac[i]=event.LOCATION;   
		});
         var emv = geoCoding(eac,function(datas){
    		for(var i in datas){
    		  	for(var j in datas[i]){
    		  		if(datas[i][j]!=null){
    	     	      var pt=new STMapMarker();
    		            //设置点对象的坐标
    		            pt.point=new STMapPoint(datas[i][j].location.split(",")[0],datas[i][j].location.split(",")[1]);
    		            //设置对象的唯一id，id要唯一，如果存在重复id，后添加的覆盖已经存在的对象
    		            pt.id="map_"+json[j].ID.toString();
    		            pt.img="./images/sxt.png";
    		            pt.size=new STMapSize(32,33); 
    		            pt.title="<div style='position:absolute;left:6px;top:5px;;font-weight:bold;margin:5 5 5 5'>探头信息</div>";
    		            //设置属性框的内容
    		            pt.content="<lable>探头名称：</lable><span style='font-weight: bold;'>"+json[j].NAME+"</span> </br><lable>探头地址：</lable><span style='font-weight: bold;'>"+json[j].LOCATION+"</span> </br><lable>探头类型：</lable><span style='font-weight: bold;'>"+json[j].TYPE+"</span></br><a class='btn btn-danger' data-position='60px'  data-toggle='modal' data-size='sm' data-remote='/tm/centerDataMatter/getProbe' style='float: right; margin: 0px 10px 10px 10px; background-color: #22b8e5; border-color: #22b8e5;'>视频播放</a>"
    		            //将该对象添加到地图上
    		            //参数pt为marker对象，参数true表示是否自动调整视野，如果为true，则地图自动定位到该位置
    		            map.addOverlay(pt,true); 
    		  		}
                }
    		  }	
    	})
    	
	}
	/*	
	function addMap(json1) {
		var point =json1[0].location.split(";");
		var pointarray=new Array();
		for(var i=0;i<point.length-1;i++){
			pointarray[i]=new BMap.Point(point[i].split(",")[0],point[i].split(",")[1]);
		}
		var polyline = new BMap.Polyline(pointarray);  //创建多边形
		polyline.setStrokeStyle("dashed");
		polyline.disableEditing();
		polyline.setStrokeColor("red");
	    map.addOverlay(polyline);
	}*/