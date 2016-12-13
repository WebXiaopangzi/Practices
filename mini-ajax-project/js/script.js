
function loadData() {

    console.log('1');

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetViewUrl + '"/>');
    console.log("streetViewUrl: " + streetViewUrl);


    // load NYTimes
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=44a6682f50ef4bffbdfa36dc0bcd0de9';
    console.log("nytimeUrl: "+nytimesUrl);

    $.getJSON(nytimesUrl,function(data){

        $nytHeaderElem.text('NewYork Times Articles About' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href ="' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        }
    }).fail(function(e){
        $nytHeaderElem.text('NewYork Times Articles Could Not Be loaded!')
    });

    //load wikipedia search

    var wikiTimeOut = setTimeout(function(){
        $wikiElem.text('failed to get wikipedia resources');
    },8000);


    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr + "&format=json&callback=wikiCallback";
    console.log('wikiUrl: ' + wikiUrl);
    $.ajax({
        url:wikiUrl,
        dataType:"jsonp",
        success: function(response){
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }
            clearTimeout(wikiTimeOut);
        }
    });


    return false;
}

$('#form-container').submit(loadData);
