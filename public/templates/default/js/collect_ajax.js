// JavaScript Document
function collect_ajax(userid,collectid,collecttype){
		$.ajax({
		  type:"POST",
		  url:"/index.php?a=ajax&mod=doing&act=collect",
		  data:{'userid':userid,'collectid':collectid,'collecttype':collecttype},
		  cache:false,
		  async:false,
		  dataType:"json",
		  beforeSend:function(){//防止重复提交
			var index = layer.load(0,{shade:0.1,shadeClose:false});
		  },
		  success:function(data){
			if(data.status=='error'){
			  layer.closeAll();
			  layer.msg(data.etips, {icon:5});
			}else if(data.status=='success'){
			  layer.closeAll();
			  layer.msg(data.etips, {icon:6});
			}
		  },
		  error: function(){
			layer.closeAll();
			layer.tips("信息提交失败,请点击重试"); 
		  }
		})
	}