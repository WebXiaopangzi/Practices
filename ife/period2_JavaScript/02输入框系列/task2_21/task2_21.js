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

//去除开头结尾的空格
function trim(str){
	var regex1 = /^\s*/;
	var regex2 = /\s*$/;
	return(str.replace(regex1,"").replace(regex2,""));
	//console.log(str);
}



	//定义队列对象
function queue(container,isDelDiv){

		this.str=[];

		this.leftPush=function(obj){
			if (arr.length) {
				this.str.unshift(obj);
				this.paint();
			}
		};

		this.rightPush=function(obj){
			if(obj.length){
				this.str.push(obj);
				this.paint();
			}
		};

		this.isEmpty=function(){
			return (this.str.length == 0);
		};

		this.leftPop=function(){
			if(!this.isEmpty()){
				alert(this.str.shift());
				this.paint();
			}
			else{
				alert("This queue is already empty!");
			}
		};

		this.rightPop=function(){
			if(!this.isEmpty()){
				alert(this.str.pop());
				this.paint();
			}
			else{
				alert("This queue is already empty!");
			}
		};

		//渲染数组
		this.paint=function(){
			var str = "";
			each(this.str, function(item){str += ("<div>" + item + "</div>")});
			container.innerHTML = str;
			if (isDelDiv) {addDivDelEvent(this,container);}
		};


		this.deleteID=function(id){
			console.log(id);
			this.str.splice(id,1);
			this.paint();
		}

	}


	//给container中每个div绑定删除函数
	function addDivDelEvent(queue,container){
		var temp =[];
		for(var cur=0;cur<container.childNodes.length;cur++){
			temp.push(container.childNodes[cur].innerHTML);
			//使用闭包
			addEventHandler(container.childNodes[cur],"click",function(cur){
				return function(){
					console.log("333");
					queue.deleteID(cur);
				}
			}(cur));
			addEventHandler(container.childNodes[cur],"mouseover",function(cur){
				return function(){
					container.childNodes[cur].style.background="green";
					container.childNodes[cur].innerHTML = "删除："+temp[cur];
				}
			}(cur));
			addEventHandler(container.childNodes[cur],"mouseout",function(cur){
				return function(){
					container.childNodes[cur].style.background="red";
					container.childNodes[cur].innerHTML = temp[cur];
				}
			}(cur));
		}
	}


window.onload = function(){
	var tagContainer = document.getElementById('tag-container');
	var tagInput = document.getElementById('tag-input');
	var hobbyContainer = document.getElementById('hobby-container');
	var hobbyInput = document.getElementById('hobby-input');
	var hobbyButton = document.getElementById('hobby-button');


	//创建对象的实例Tag和Hobby
	var tagQueue = new queue(tagContainer,true);
	var hobbyQueue = new queue(hobbyContainer,true);

	//绑定事件
	addEventHandler(hobbyButton,"click",function(){
		console.log("hobbyButton");
		var input = each(splitInput(trim(hobbyInput.value)),function(item,index){
			if (hobbyQueue.str.indexOf(item) === -1) {
				hobbyQueue.rightPush(item);
				if(hobbyQueue.str.length>10){
					hobbyQueue.leftPop();
				}
			}
		});
		hobbyQueue.paint();
	});


	addEventHandler(tagInput,"keyup",function(e){
		if(/[,，;；、。.\s\n]+/.test(tagInput.value) || e.keyCode ===13){
			var handleData = splitInput(trim(tagInput.value));
			var data = handleData[0];
			if (tagQueue.str.indexOf(data) === -1) {
				tagQueue.rightPush(data);
				if (tagQueue.str.length>10) {
					tagQueue.leftPop();
				}
			}
			tagQueue.paint();
			tagInput.value = "";
		}
	});
}
