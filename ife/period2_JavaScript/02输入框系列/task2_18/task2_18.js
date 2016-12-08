//事件绑定函数，兼容浏览器差异
function addEventHandler(ele,event,handler){
	if(ele.addEventListener){
		ele.addEventListener(event,handler,false);
	}
	else if(ele.attachEvent){
		ele.attachEvent("on"+event,handler);
	}
	else{
		ele["on"+event]=handler;
	}
}

//遍历数组，针对数组中每一个元素执行fun函数，并将数组索引和元素作为参数传递；
//用来渲染样式；
function each(arr,fn){
	for(var cur=0; cur<arr.length; cur++){
		fn(arr[cur],cur);
	}
}


window.onload = function(){
	var container = document.getElementById('container');
	var buttonList = document.getElementsByTagName('input');

	//定义队列对象
	var queue = {

		str:[],

		leftPush:function(num){
			this.str.unshift(num);
			this.paint();
		},

		rightPush:function(num){
			this.str.push(num);
			this.paint();
		},

		isEmpty:function(){
			return (this.str.length == 0);
		},

		leftPop:function(num){
			if(!this.isEmpty()){
				alert(this.str.shift());
				this.paint();
			}
			else{
				alert("This queue is already empty!");
			}
		},

		rightPop:function(){
			if(!this.isEmpty()){
				alert(this.str.pop());
				this.paint();
			}
			else{
				alert("This queue is already empty!");
			}
		},

		//渲染数组
		paint:function(){
			var str = "";
			each(this.str,function(item){str+=("<div>" + parseInt(item) + "</div>")});
			container.innerHTML = str;
			addDivDelEvent();
		},


		deleteID:function(id){
			console.log(id);
			this.str.splice(id,1);
			this.paint();
		}

	}

	//使onclick事件指向一个新的闭包对象，https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures#Creating_closures_in_loops_A_common_mistake
	function deleteIDcallback(id){
		return function(){
			queue.deleteID(id);
		}
	}

	//给container中每个div绑定删除函数
	function addDivDelEvent(){
		for (var i = 0; i < container.childNodes.length; i++) {
			addEventHandler(container.childNodes[i],"click",deleteIDcallback(i));
		}
	}


	addEventHandler(buttonList[1],"click",function(){

		var input = buttonList[0].value;
		if((/^[0-9]+$/).test(input)){
			queue.leftPush(input);
		}
		else{
			alert("Error: Please enter an interger!")
		}
	});


	addEventHandler(buttonList[2],"click",function(){
		var input = buttonList[0].value;
		if((/^[0-9]+$/).test(input)){
			queue.rightPush(input);
		}
		else{
			alert("Error:Please enter an interger!");
		}
	});

	addEventHandler(buttonList[3],"click",function(){queue.leftPop();});
	addEventHandler(buttonList[4],"click",function(){queue.rightPop();});


}

