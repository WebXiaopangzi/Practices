var traverse = [];//存放遍历结果
var search=[];//存放搜索结果
var timer;

//前序遍历树
function preOrder(tree){
	if(tree !== null){
		traverse.push(tree);
		for(var i=0;i<tree.children.length;i++){
			preOrder(tree.children[i]);
		}
	}
}


//后序遍历树





//搜索树
var tag=true;//标记是否搜到，搜到为false
function searchTree(tree,content){
	var equal = (tree.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content );
	if (!equal && tag) {
		search.push(tree);
		for (var i = 0; i < tree.children.length; i++) {
			searchTree(tree.children[i],content);
		}
	}
	else if (equal) {
		search.push(tree);
		tag = false;
		//return;
	}
}

//清理前一个遍历或搜索
function clearResult(){
	var allDiv = document.getElementsByTagName('div');
	for(var i=0;i<allDiv.length;i++){
		allDiv[i].style.backgroundColor = '#fff';
	}
	clearInterval(timer);
	traverse=[];
	search=[];
	tag=true;
}

//将遍历或搜索结果用动画展示
function animate(result,searchOrTraverse){
	var i=0;
	result[i].style.backgroundColor = '#8daa9e';
	timer = setInterval(function(){
		i++;
		if(i<result.length){
			result[i-1].style.backgroundColor = '#fff';
			result[i].style.backgroundColor = '#8daa9e';
		}else if(searchOrTraverse === 'search'){
			clearInterval(timer);
			result[result.length-1].style.backgroundColor = 'red';
		}else if (searchOrTraverse === 'traverse') {
			clearInterval(timer);
			result[result.length-1].style.backgroundColor = '#fff';
		}else if (searchOrTraverse === 'searchNoResult') {
			clearInterval(timer);
			result[result.length-1].style.backgroundColor = '#fff';
			alert('没有查询到搜索内容');
		}
	},500);
}


window.onload = function(){
	var domTree = document.getElementById('root');
	console.log(domTree + '结束');
	console.log(domTree.children[0] + 'jieshu');

	document.getElementById('preOrder').onclick = function(){
		clearResult();
		preOrder(domTree);
		animate(traverse,'traverse');
	};

	document.getElementById('searchBtn').onclick = function(){
		var content = document.getElementById('searchTxt').value;
		if (content === '') {
			alert('请填写要搜索的内容');
		}else{
			clearResult();
			searchTree(domTree,content);
			if(!tag) {
				animate(search,'search');
			}
			else{
				animate(search,searchNoResult);
			}
		}
	};

	//点击变背景色
	var selectDiv;
	var levels = document.getElementById('boxContainer').getElementsByTagName('div');
	for(var i=0;i<levels.length;i++){
		levels[i].onclick = function(e){
			clearResult();
			this.style.backgroundColor = '#fef9d1';
			e.stopPropagation();//阻止事件冒泡
			selectDiv = this;
		};
	}

	//删除选中Box以及子节点
	document.getElementById('deleteBtn').onclick = function(){
		if(selectDiv === undefined){
			alert('请先选中要删除的节点');
		}else{
			var parent = selectDiv.parentNode;
			parent.removeChild(selectDiv);
		}
	};


	//在选中节点下增加子节点
	document.getElementById('insertBtn').onclick = function(){
		var content = document.getElementById('insertTxt').value;

		if (content === '') {
			alert('请先填写新增节点的内容');
		}else if(selectDiv === undefined){
			alert('请先选中要操作的节点');
		}else{
			var newDiv = document.createElement('div');
			newDiv.innerHTML = content;
			newDiv.className = 'level_';
			selectDiv.appendChild(newDiv);

			//更新点击事件
			levels = document.getElementById('boxContainer').getElementsByTagName('div');
			for(var i=0;i<levels.length;i++){
				levels[i].onclick = function(e){
					clearResult();
					this.style.backgroundColor = '#fef9d1';
					e.stopPropagation();//阻止事件冒泡
					selectDiv = this;
				};
			}
		}
	}




}







