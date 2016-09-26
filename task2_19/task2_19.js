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

		isFull:function(){
			return (this.str.length >= 60)
		},

		leftPush:function(num){
			if(!this.isFull()){
				this.str.unshift(num);
				this.paint();
			}
			else{
				alert("The queue is already full(60).")
			}
		},

		rightPush:function(num){
			if(!this.isFull()){
				this.str.push(num);
				this.paint();
			}
			else{
				alert("the queue is already full(60).")
			}
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
			each(this.str,function(item){str+=("<div style='height:" + (parseInt(item)*2) + "px;'></div>")});
			container.innerHTML = str;
			addDivDelEvent();
			// console.log(this.str);
		},


		deleteID:function(id){
			console.log(id);
			this.str.splice(id,1);
			this.paint();
		},

		randomStr:function(){
			var str1=[];
			for (var i = 0; i < 60; i++) {
				str1[i] = Math.floor(Math.random()*99)+1;
			}
			console.log(str1);
			this.str = str1;
			this.paint();
		}


	}

	function selectionSort(){
		var clock;
		var count=0,i=0,j=0;

		//冒泡排序，有动画
		// colck = setInterval(function(){
		// 	if(count>= queue.str.length){
		// 		clearInterval(clock);
		// 	}
		// 	if(i == queue.str.length-1-count){
		// 		i=0;
		// 		count++;
		// 	}
		// 	if(queue.str[i] > queue.str[i+1]){
		// 		var temp = queue.str[i];
		// 		queue.str[i] = queue.str[i+1];
		// 		queue.str[i+1] = temp;
		// 		queue.paint();
		// 	}
		// 	i++;
		// },100);

		//选择排序，有动画
		clock = setInterval(function(){
			if(i>=queue.str.length){
				clearInterval(clock);
			}
			if(i<queue.str.length-1){
				minIndex=i;
				minValue=queue.str[i];
				for(j=i+1;j<queue.str.length;j++){
					if (queue.str[j]<minValue) {
						minIndex = j;
						minValue = queue.str[j];
					}
				}
				var temp = queue.str[i];
				queue.str[i] = minValue;
				queue.str[minIndex] = temp;
				i++;
				queue.paint();
			}
		},50);



			// 选择排序，无动画
			// for(i=0;i<queue.str.length-1;i++){
			// 	minIndex=i;
			// 	minValue=queue.str[i];
			// 	for(j=i+1;j<queue.str.length;j++){
			// 		if (queue.str[j]<minValue) {
			// 			minIndex=j;
			// 			minValue=queue.str[j];
			// 		}
			// 	}
			// 	var temp=queue.str[i];
			// 	queue.str[i] = minValue;
			// 	queue.str[minIndex] = temp;
			// }

			// console.log(queue.str);
			// queue.paint();
	
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
		if((/^[0-9]+$/).test(input) && input>0 && input<100){
			queue.leftPush(input);
		}
		else{
			alert("Error: Please enter an interger between 0 and 100!")
		}
	});


	addEventHandler(buttonList[2],"click",function(){
		var input = buttonList[0].value;
		if((/^[0-9]+$/).test(input) && input>0 && input<100){
			queue.rightPush(input);
		}
		else{
			alert("Error:Please enter an interger between 0 and 100!");
		}
	});

	addEventHandler(buttonList[3],"click",function(){queue.leftPop();});
	addEventHandler(buttonList[4],"click",function(){queue.rightPop();});

	addEventHandler(buttonList[5],"click",function(){queue.randomStr();});
	addEventHandler(buttonList[6],"click",selectionSort);


}

