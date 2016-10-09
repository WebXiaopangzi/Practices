var traverse = [];
var timer;


//前序遍历
function preOrder(tree){
	if (tree !== null) {
		traverse.push(tree);
		preOrder(tree.firstElementChild);
		preOrder(tree.lastElementChild);
	}
}

//中序遍历
function inOrder(tree){
	if (tree !== null) {
		inOrder(tree.firstElementChild);
		traverse.push(tree);
		inOrder(tree.lastElementChild);
	}
}

//后序遍历
function postOrder(tree){
	if (tree !== null) {
		postOrder(tree.firstElementChild);
		postOrder(tree.lastElementChild);
		traverse.push(tree);
	}
}


window.onload = function(){
	var root = document.getElementsByClassName('root')[0];

	document.getElementById('preOrder').onclick = function(){
		clearTraverse();
		preOrder(root);
		animate(traverse);
	};

	document.getElementById('inOrder').onclick = function(){
		clearTraverse();
		inOrder(root);
		animate(traverse);
	};

	document.getElementById('postOrder').onclick = function(){
		clearTraverse();
		postOrder(root);
		animate(traverse);
	};

}

//清理前一个遍历
function clearTraverse(){
	var allDiv = document.getElementsByTagName('div');
	for (var i = 0; i < allDiv.length; i++) {
		allDiv[i].style.backgroundColor = "#fff";
	}
	clearInterval(timer);
	traverse = [];
}

//动画效果
function animate(str){
	var i=0;
	str[i].style.backgroundColor = '#fec8b0';
	timer = setInterval(function(){
		i++;
		if (i<str.length) {
			str[i-1].style.backgroundColor = '#fff';
			str[i].style.backgroundColor = '#fec8b0';
		}
		else{
			clearInterval(timer);
			str[str.length-1].style.backgroundColor = '#fff';
		}
	},500);
}