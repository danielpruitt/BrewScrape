$(document).ready(function () {

    // Whenever someone clicks the button the activator opens the comment fields 
    $(".activator").on("click", function () {
        
        // Save the id from the button, id comes from the parent Article
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);  

                // //variables for testing
                var titleInput = $("#" + thisId + "title").val();
                var bodyInput = $("#" + thisId + "body").val();
                console.log("title:" + titleInput)
                console.log("body:" + bodyInput)
                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $(".titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $(".bodyinput").val(data.note.body);
                }
            });
    });

    $(".savenote").on("click", function () {
        event.preventDefault();
        //variables for for the data-id        
        var thisId = $(this).attr("data-id");
        console.log(thisId)

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#" + thisId + "title").val(),
                // Value taken from note textarea
                body:$("#" + thisId + "body").val()
            }
        })
            // With that done
            .then(function (data) {
                
                // Log the response
                console.log(data);
                // Empty the notes section
                $(".notes").empty();
                
                location.reload();
            

            });

        // Also, remove the values entered in the input and textarea for note entry
        $(".titleinput").val("");
        $(".bodyinput").val("");

    });
    //this delete click does not erase from the database, all notes are stored regardless. the user sees them as empty and can input a new note
    $(".delNote").on("click", function() {
        event.preventDefault();
        //variables for for the data-id        
        var thisId = $(this).attr("data-id");
        console.log(thisId)
        $(".titleinput").val("");
        $(".bodyinput").val("");
        $(".hide").hide();
        


    });
    


    $(".newScrape").on("click", function newScrape() {
        $.get("/api/fetch").then(function (data) {
            initPage();
        })
    });

});
