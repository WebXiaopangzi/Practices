
//生成树遍历算法

var traversal = {
	preOrder:function preOrder(root){
		var traverseQueue = [];
		function genTraverseQueue(root){
			var key;
			traverseQueue.push(root.view);
			for(key in root){

				if(key != 'view'){
					if(root.hasOwnProperty(key)){

						genTraverseQueue(root[key]);
					}
				}
			}
		}
		genTraverseQueue(root);
		//data第一次访问view的时候为undifined,删除第一个元素
		traverseQueue.shift();
		return traverseQueue;
	},


	postOrder:function postOrder(root){
		var traverseQueue = [];
		function genTraverseQueue(root){
			var key;
			for(key in root){
				if(key!='view'){
					if(root.hasOwnProperty(key)){
						genTraverseQueue(root[key]);
					}
				}
			}
			traverseQueue.push(root.view);
		}
		genTraverseQueue(root);
		//data第一次访问view的时候为unefind，删除最后一个元素
		traverseQueue.pop();
		return traverseQueue;
	}

};

//初始化一棵树同时绑定事件
function initTree(data){
	var rootView = document.getElementById('root');
	rootView.innerHTML = '';
	renderTree(data,rootView);
	var PreAnimate;
	var animator = new treeAnimator();
	//当树渲染完成后再绑定遍历按钮的事件
	addClickEvent($(preOrder),function(){
		animator.animatorTraverse(traversal.preOrder(data),false);
	});

	addClickEvent($('postOrder'),function(){
		animator.animatorTraverse(travesal.postOrder(data),false);
	});

	addClickEvent($('preOrderSearchBtn'),function(){
		var searchResult
	})

}


function init() {
	var data = {
		'root':{
			'a':{
				'a1':{},
				'a2':{}
			}
			'b':{
				'b1':{
					'b1.1':{},
					'b1.2':{},
					'b1.3':{
						'b1.3.1':{}
					}
				},
				'b2':{
					'b2.1':{}
				}
			}
		}
	};

	initTree(data);
}

init();