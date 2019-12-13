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
                var totalQues = data.length;
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
                    
                    if (queCount == totalQues - 2) {
                        submitAns.html("Finish");
                    } else if (queCount == totalQues - 1) {
                        var dataObj = {
                            'user_id': "5df37115f775c81004ee2594",
                            'quiz_type': quiz_type,
                            'beginner': correctAnsCount
                        };

                        if (quiz_type == "intermediate") {
                            dataObj = {
                                'user_id': "5df37115f775c81004ee2594",
                                'quiz_type': quiz_type,
                                'intermediate': correctAnsCount
                            };
                        } else if (quiz_type == "advanced") {
                            dataObj = {
                                'user_id': "5df37115f775c81004ee2594",
                                'quiz_type': quiz_type,
                                'advanced': correctAnsCount
                            }
                        }
                        //update quiz score
                        $.ajax({
                            url: "/progress/",
                            type: 'post',
                            dataType: 'json',
                            data: dataObj,
                            success: function (data) {
                                console.log("back from progress", data);
                                window.location.href = "/quiz/";
                            },
                            error: function (data) {
                                console.log("back from progress", data.status);
                                console.log("back from progress", data.responseText);
                            }
                        });
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