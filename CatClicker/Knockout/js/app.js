var initCats = [
    {
        clickCount:0,
        name:'Teddy',
        imgSrc:'img/cat1.jpg',
        nickNames:['11','22','33','44']
    },
    {
        clickCount:0,
        name:'Tiger',
        imgSrc:'img/cat2.jpg',
        nickNames:['aa','bb','cc','dd']
    },
    {
        clickCount:0,
        name:'Mecy',
        imgSrc:'img/cat3.jpg',
        nickNames:['xx','yy','xy','yx']
    },
    {
        clickCount:0,
        name:'Yoyo',
        imgSrc:'img/cat4.jpg',
        nickNames:['99','88','77','66']
    },
    {
        clickCount:0,
        name:'Auror',
        imgSrc:'img/cat5.jpg',
        nickNames:['qq','ww','eee','ss']
    }
];



Cat = function(data){

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = data.imgSrc;
    this.nickNames = ko.observableArray(data.nickNames);

    this.title = ko.computed(function(){
        var title;
        var clicks = this.clickCount();
        if (clicks < 10) {
            title = 'New Born';
        } else if (clicks < 50) {
            title = 'Infant';
        } else if (clicks<100) {
            title = 'Child';
        } else if (clicks<200) {
            title = 'Teen';
        } else if (clicks<500) {
            title = 'Audlt';
        } else {
            title = 'Ninja';
        }
        return title;

    },this);

};

var viewModel = function() {

    var self = this;

    this.catList = ko.observableArray([]);

    initCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.setCat = function(clickedCat){
        self.currentCat(clickedCat);
    };

    this.incrementCounter = function(){
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };
};

ko.applyBindings(new viewModel());