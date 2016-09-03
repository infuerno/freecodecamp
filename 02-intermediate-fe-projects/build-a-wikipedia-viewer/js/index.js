var isSearchBoxOpen = false;

function openSearchBox() {
	isSearchBoxOpen = true;
	$("#random").addClass("hide");  // TODO animate this to move to the right and fade
	$("#search-tail").animate({height:'0px'}, 200);
	$("#search").animate({width:'300px'}, 500, function() {
		$("#cross")
			.animate({height:'20px'}, 100)
			.position({
			  my: "center",
			  at: "right-20 center+10",
			  of: "#search"
			});				
	}).css("cursor", "text").focus();
}

function clearResults() {
	markResultsToBeDeleted();
	clearResultsToBeDeleted();
}


function markResultsToBeDeleted() {
	// mark each existing result row to be deleted
	$("#results .row").each(function(i) {
		$(this).addClass("delete");
	});
}

function clearResultsToBeDeleted() {
	if ($("#results .delete").length == 0) {
		return false;
	} else {
		setTimeout(function() {
			$("#results .delete")[$("#results .delete").length - 1].remove();
			clearResultsToBeDeleted();
		}, 50);
	}
}

function closeSearchBox() {
	isSearchBoxOpen = false;
	$("#main").addClass("vertical-center").css("margin-top", "0px");
	$("#search").val("");
	$("#cross").animate({height:'0px'}, 500);
	$("#search-tail").animate({height:'10px'}, 500);
	$("#search").animate({width:'0px'}, 500, function() {
		$("#random").removeClass("hide");
	}).css("cursor", "pointer");
}

function getWikipediaArticles() {
	var base = "https://en.wikipedia.org/w/api.php";
	var url = base + "/w/api.php?callback=?&action=opensearch&format=json&search=";
	var userAgent = "FreeCodeCamp-Project/1.1 (http://localhost:8080; infuerno@mail.com)";
	url += $("#search").val();
	console.log(url);
	//url = "data/" + $("#search").val() + ".json";
	$.ajax( {
	    url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
	    type: 'GET',
	    headers: { 'Api-User-Agent': userAgent },
	    success: function(data) {
	       console.log(data);
	       //var searchTerm = data[0];
	       $(data[1]).each(function(i, resultTitle) {
	       		resultUrl = data[3][i];
	       		resultDescription = data[2][i];
	       		var html = '<div class="row result">';
	       		html += '<a href="' + resultUrl + '">';
	       		html += '<div class="col-xs-12">';
	       		html += '<h4>' + resultTitle + '</h4>';
	       		html += '<p>' + resultDescription + '</p>';
	       		html += '</div></a></div>'
	       		$("#results .container").append(html);
	       });
	    }
	} );
}

$(document).ready(function() {

	$( "#cross").css("height", "0px");

	$( "#search-tail" ).position({
	  my: "center",
	  at: "center+10 bottom-5",
	  of: "#search"
	});

	$("#search").click(function(){
		if (!isSearchBoxOpen){
			openSearchBox();
		}
	});

	$("#cross").click(function() {
		clearResults();
		if (isSearchBoxOpen) {
			closeSearchBox();
		}
	});

	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape
			clearResults();
			if (isSearchBoxOpen) { 
				closeSearchBox();
			}
		}
		if (e.keyCode == 83 && !isSearchBoxOpen) { // s
			e.preventDefault();
			openSearchBox();
		}
	});

	$("#search").keydown(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			clearResults();
			$("#main").removeClass("vertical-center").css("margin-top", "20px");
			getWikipediaArticles();
		}
	});

	$.typeahead({
    input: '#search',
    minLength: 1,
    order: "asc",
    offset: true, // only match strings starting with
    hint: true,
    source: {
        article: {
            ajax: {
                url: "data/japan.json",
		        dataType: 'jsonp',
		        jsonp: 'callback',
			    type: 'GET',
			    headers: { 'Api-User-Agent': userAgent },
            }
        }
    },
    callback: {
        onClick: function (node, a, item, event) {
 
            console.log(node)
            console.log(a)
            console.log(item)
            console.log(event)
 
            console.log('onClick function triggered');
 
        },
        onSubmit: function (node, form, item, event) {
 
            console.log(node)
            console.log(form)
            console.log(item)
            console.log(event)
 
            console.log('onSubmit override function triggered');
 
        }
    }
});

});