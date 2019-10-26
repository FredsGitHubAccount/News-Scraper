// Will scrape all of the articles and insert them into the database
$("#scrape-data").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function () {

        displayUnsavedArticles()

    })
})

// Displays newly scraped articles after clicking the scraper button
function displayUnsavedArticles() {
    $.ajax({
        method: "GET",
        url: "/unsavedarticles"
    }).then(function (data) {
      $("#article-display").empty()
        console.log(data)
        if (data.length) {
            for (let i = 0; i < data.length; i++) {

                let newDiv = $(`<div id="article">`)
                newDiv.append($(`<h3>Article Title : ${data[i].title}</h3>`))
                newDiv.append($(`<h4> Article Description : ${data[i].description}</h4>`))
                newDiv.append($(`<h4> Article Link : <a target="_blank" href="${data[i].link}">${data[i].description}</a></h4>`))
                newDiv.append($(`<h5><button class="save-article" data="${data[i]._id}">Save Article </button></h5>`))
                $("#article-display").append(newDiv)
            }
        }
        else {
            $("#article-display").html($(`<h2> Click the get articles button to get articles!</h2>`))
        }

    })
}

function newSavedArticle(){
    let buttonId = $(this).attr("data")

    $.ajax({
        method: "PUT",
        url: `/newlysaved/${buttonId}`

    }).then(function(data){
        console.log(data)
        displayUnsavedArticles()

    })

}


// Clears article from DB on click
$("#clear-articles").on("click", function () {
    $.ajax({
        method: "DELETE",
        url: "/articles"

    }).then(function (data) {
        $("#article-display").empty()
        location.reload()
        console.log(`You have deleted your articles`)
        console.log(data)
    })
})


// Display articles from database on page load
displayUnsavedArticles()
$(document).on("click",".save-article",newSavedArticle)

