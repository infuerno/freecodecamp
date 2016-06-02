function getHref(url) {
	return "<a href='" + url + "' target='_blank'>" + url + "</a>";
}

function getStands4Quote() {
	var uid = "[FILLMEIN]";
	var tokenid = "[FILLMEIN]";
	var url = "http://www.stands4.com/services/v2/quotes.php?uid=" + uid + "&tokenid=" + tokenid + "&searchtype=RANDOM";
	//url = "data/quote-stands4.xml";
	$.get(url, function(data) {
		var quote = $(data).find("quote").text();
		var author = $(data).find("author").text();
		var authorUrl = encodeURI("http://www.quotes.net/authors/" + author);
		var credits = getHref("http://www.quotes.net/");
		populateQuote(quote, author, authorUrl, credits);
	});
}

function getTheySaidSoQuote() {
	var url = "data/quote-theysaidso.json";

	var credits = '<span style="z-index:50;font-size:0.9em;"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>';
}

function getDesignQuote() {
	// doesn't work outside s.codepen.io
	var url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";
	url = "data/quote-quotesondesign.json";
	$.getJSON(url, function(data) {
		var quote = data[0].content;
		var author = data[0].title;
		var authorUrl = data[0].link;
		var credits = getHref("http://quotesondesign.com/");
		populateQuote(quote, author, authorUrl, credits);
	});
}

function populateQuote(quote, author, authorUrl, credits) {
	$("#quote").html(quote);
	$("#author").html("<a target='_blank' href='" + authorUrl + "'>" + author + "</a>");

	var limit = 140;
	limit -= (" —" + author).length;
	if (quote.length > limit) {
		quote = quote.substring(0, limit - 3) + "...";
	}
	var twitterUrl = encodeURI("https://twitter.com/intent/tweet?text=" + quote + " —" + author);
	$("#twitter-link").attr("href", twitterUrl);

	$("#credits").html(credits);
}

$(document).ready(function() {
	var quote = "And this our life, exempt from public haunt, finds tongues in trees, books in running brooks, sermons in stones, and good in everything.";
	var author = "Shakespeare";
	populateQuote(quote, author, "#", "", "#");
	$("#new-quote").on("click", function() {
		//getStands4Quote();
		//getTheySaidSoQuote();
		getDesignQuote();
	});
});