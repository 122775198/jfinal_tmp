var Options={
	createNew:function(){
		var option={};
		//
		option.getallrkoption=function(json){
			var allrkoption = {
				    title : {
				        x:'center'
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left'
				    },
					tooltip : {
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)"
					},
				    series : [
				        {
				            radius : '35%',
				            center: ['50%', '50%']
				        }
				    ],
					itemStyle : {
						emphasis : {
							shadowBlur : 10,
							shadowOffsetX : 0,
							shadowColor : 'rgba(0, 0, 0, 0.5)'
						}
					}
				};
			allrkoption.title['text']=json.title;
			allrkoption.legend['data']=json.legend;
			allrkoption.series[0]['data']=json.series[0].data;
			allrkoption.series[0]['type']=json.series[0].type;
			allrkoption.series[0]['name']=json.series[0].name;
			return allrkoption;
		};
		return option;
}
}