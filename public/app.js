$(document).ready(function () {

    // Whenever someone clicks the button the activator opens the comment fields 
    $(".activator").on("click", function () {

        // Empty the notes from the note section
        // $(".notes").empty();
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

                //deletes note but does not remove from the database. this means that upon reload the comment will still be in
                $(".delNote").on("click", function () {
                    $(".titleinput").val("");
                    $(".bodyinput").val("");
                });
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
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("id");
        // console.log(titleInput)
        // console.log(bodyInput)

        //variables for testing
        
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
                $(".notes").append("<h4>Thank you for your submission, please click the X to continue.</h4>");

            });

        // Also, remove the values entered in the input and textarea for note entry
        $(".titleinput").val("");
        $(".bodyinput").val("");
    });
    

    $(".newScrape").on("click", function newScrape() {
        $.get("/api/fetch").then(function (data) {
            initPage();
        })
    });

});
