// SETUP VARIABLES
// =========================================
var authKey = "9d4a8986921972b65754ea0809d47c84:12:74623931";

// Search Parameters
var queryTerm 	= "";
var numResults 	= 0;

// URL Base
var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey; 

// Variable to Track number of articles
var articleCounter = 0;

// FUNCTIONS
// =========================================
function runGiphy(queryURL, results){

   var type = $(this).data('queryTerm');
   var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

   $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
    		console.log(response.data[1].images.downsized.url);
               // setting the variable of the image_url to the specific objec
               var imageUrl = response.data[1].images.downsized.url;

               // create an variable called political imeage
               var polImage = $("<img>");
               
               // given the political image the sourcetag and an alt tag
               polImage.attr('src', imageUrl);
               polImage.attr('alt', 'political image');


               //puts it before the content that is there
               $('#images').append(polImage);
           });
 
};



function runQuery(numArticles, queryURL){

	// AJAX Function
	$.ajax({url: queryURL, method: "GET"})
		.done(function(NYTData) {

			// Logging to Console
			console.log("------------------");
			console.log(queryURL);
			console.log("------------------");
			console.log(numArticles);
			console.log(NYTData);

			// Clear the wells from the previous run
			$('#wellSection').empty();

			for (var i=0; i<numArticles; i++){

				// Start Dumping to HTML Here
				var wellSection = $('<div>');
				wellSection.addClass("well");
				wellSection.attr('id', 'articleWell-' + i);
				$('#wellSection').append(wellSection);

				// Check if things exist 
				if(NYTData.response.docs[i].headline != "null") {
					console.log(NYTData.response.docs[i].headline.main);
					$("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main +  "</h3>");
				}

				// Check if the byline 
				if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
					console.log(NYTData.response.docs[i].byline.original);
					$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
				}

				// Attach the content to the appropriate well
				$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
				$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
				$("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

				console.log(NYTData.response.docs[i].section_name);
				console.log(NYTData.response.docs[i].pub_date);
				console.log(NYTData.response.docs[i].web_url);
			}


		})

}

// MAIN PROCESSES
// =========================================

$('#searchBtn').on('click', function() {

	// Get Search Term
	queryTerm = $('#search').val().trim();

	// Add in the Search Term
	var newURL = queryURLBase + "&q=" + queryTerm;

	// Get the Number of Records
	numResults = $("#numRecords").val();


	// Send the AJAX Call the newly assembled URL 
	runQuery(numResults, newURL);
	runGiphy();

	return false;

})




	$('.carousel').carousel({
		interval: 3000
	})
