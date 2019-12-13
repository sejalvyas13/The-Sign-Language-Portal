(function ($) {

    var quizTypeBtn = $(".quizType");

    var quiz_type = quizTypeBtn.val();
    console.log("quiz_type", quiz_type);
    quizTypeBtn.click(function (ev) {
        $.ajax({
            url: "/quiz/",
            type: 'post',
            dataType: 'json',
            data: { 'quiz_type': quiz_type },
            success: function (data) {
                console.log("signs array", data);
                console.log("array length", data.length);

                $("#mainBody").html("<img id='sign_media'><input type='text' name='sign_text' id='sign_text'><button type='submit' id='btn_submit'>Next</button>");

                var signsArr = data;
                var queCount = 0;
                var correctAnsCount = 0;
                
                var img = $("#sign_media");
                var sign_text = $("#sign_text");
                var submitAns = $("#btn_submit");

                // load first question
                console.log("img url", signsArr[queCount].media_path);
                img.attr("src", signsArr[queCount].media_path);

                submitAns.click(function (ev) {
                    if (sign_text.val() == signsArr[queCount].text) {
                        correctAnsCount += 1;
                    }
                    queCount += 1;

                    img.attr("src", signsArr[queCount].media_path);
                    console.log("Correct answers:", correctAnsCount);
                    console.log("question number:", queCount);
                    console.log("img url", signsArr[queCount].media_path);
                });

            },
            error: function (data) {
                //Here the status code can be retrieved like;
                console.log(data.status);

                //The message added to Response object in Controller can be retrieved as following.
                console.log(data.responseText);
            }
        });
    });




})(window.jQuery);