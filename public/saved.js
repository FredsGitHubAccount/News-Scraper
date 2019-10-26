// On page load, display all saved articles
function displaySavedArticles() {
    $.ajax({
        method: "GET",
        url: "/savedarticles"
    }).then(function (data) {
      $("#display-saved-articles").empty()
        console.log(`Unsaved Articles`)
        console.log(data)
        if (data.length) {
            for (let i = 0; i < data.length; i++) {

                let newDiv = $(`<div data="${data[i]._id}" id="article">`)
                newDiv.append($(`<h3>Article Title : ${data[i].title}</h3>`))
                newDiv.append($(`<h4> Article Description : ${data[i].description}</h4>`))
                newDiv.append($(`<h4> Article Link : <a target="_blank" href="${data[i].link}">Click Here</a></h4>`))
                newDiv.append($(`<h5><button class="unsave-article" data="${data[i]._id}">Unsave Article </button></h5>`))
                newDiv.append($(`<h5><button class="view-notes" data="${data[i]._id}">View Notes </button></h5>`))
                newDiv.append($(`<h5><button class="close-notes">Close Notes</button></h5>`))
                $("#display-saved-articles").append(newDiv)
            }
        }
        else {
            $("#display-saved-articles").html($(`<h2> Click The Scraper Button On The Homepage!</h2>`))
        }

    })
}

// Unsave article
function unsaveArticle(){
    let buttonId = $(this).attr("data")

    $.ajax({
        method: "PUT",
        url: `/newlyunsaved/${buttonId}`

    }).then(function(data){
        console.log(data)
        displaySavedArticles()

    })
}

function displayNotes(){

    let notesId= $(this).attr("data")
    $("#notes-container").empty();

    $.ajax({
        method: "GET",
        url: `/displaynotes/${notesId}`
    }).then(function(data){
        
        let notesDiv = $("<div>")
        notesDiv.append("<h3>Insert a Note for this article</h3>")
        if(data.note){
            for(let i = 0; i < data.note.length;i++){
            notesDiv.append(`<h4>${data.note[i].noteText}</h4>`)
        }
    }
        let notesForm = $(`<form data="${data._id}" id="submit-form">`)
        notesForm.append(`<input id="note" name="note" type="text">`)
        notesForm.append(`<button type="submit">Submit Note </button>`)
        notesDiv.append(notesForm)
        $("#notes-container").append(notesDiv)
       

    })
}

function submitNote(){

    let noteId = ($(this).attr("data"))

    let createdNote = {
        note : $("#note").val().trim()
    }

    $.ajax({
        method: "POST",
        url: `/postnotes/${noteId}`,
        data : createdNote
    }).then(function(){
        
        displayNotes()
    })
    

}

function closeNotes(){
    $("#notes-container").empty()
}



// Display Saved Articles On Page Load
displaySavedArticles()
$(document).on("click",".unsave-article",unsaveArticle)
$(document).on("click",".view-notes",displayNotes)
$(document).on("submit","#submit-form", submitNote)
$(document).on("click",".close-notes",closeNotes)