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

//分割输入的内容为数组
function splitInput(text){
	var inputArr = [];
	inputArr = (text).split(/[,，.。;；、\s\n]+/);
	return inputArr;
}

//对textarea中的内容进行trim，去除开头结尾的大量bug
function trim(str){
	var regex1 = /^\s*/;
	var regex2 = /\s*$/;
	return(str.replace(regex1,"").replace(regex2,""));
	//console.log(str);
}


window.onload = function(){
	var container = document.getElementById('container');
	var buttonList = document.getElementsByTagName('input');

	//定义队列对象
	var queue = {

		str:[],

		leftPush:function(arr){
			for(var cur in arr){
				this.str.unshift(arr[cur]);
			}
			this.paint();
		},

		rightPush:function(arr){
			for(var cur in arr){
				this.str.push(arr[cur]);
			}
			this.paint();
		},

		isEmpty:function(){
			return (this.str.length == 0);
		},

		leftPop:function(){
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
			each(this.str, function(item){str += ("<div>" + item + "</div>")});
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

	//查询内容
	function searchDivContent(text){
		for(var cur=0;cur<container.childNodes.length;cur++){
			container.childNodes[cur].style.color = "#FFFFFF";
			container.childNodes[cur].style.background = "red";
		}
		for(var cur=0;cur<container.childNodes.length;cur++){
			if(container.childNodes[cur].innerHTML.indexOf(text) != -1){
				console.log(container.childNodes[cur].innerHTML);
				container.childNodes[cur].style.color = "#FFFFFF";
				container.childNodes[cur].style.background = "blue";
			}
		}
	}


	addEventHandler(buttonList[0],"click",function(){
		var input = splitInput(trim(document.getElementById('inputbox').value));
			queue.leftPush(input);
	});


	addEventHandler(buttonList[1],"click",function(){
		var input = splitInput(trim(document.getElementById('inputbox').value));
		queue.rightPush(input);
	});

	addEventHandler(buttonList[2],"click",function(){queue.leftPop();});
	addEventHandler(buttonList[3],"click",function(){queue.rightPop();});

	addEventHandler(buttonList[5],"click",function(){
		var inputValue = buttonList[4].value;
		if(inputValue == ""){
			alert("Cannot search undefined value.");
		}
		else{
			searchDivContent(inputValue);
		}
	});


}

