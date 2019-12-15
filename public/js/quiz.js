(function ($) {

    var launchQuizBtn = $("#launchQuiz");


    launchQuizBtn.click(function (ev) {

        var language = $('input[name=language]:checked').val();
        var level = $('input[name=level]:checked').val();

        console.log("language", language);
        console.log("level", level);

        $.ajax({
            url: "/quiz/",
            type: 'post',
            dataType: 'json',
            data: { 'language': language, "level": level },
            success: function (data) {
                var totalQues = data.allSigns.length;
                console.log("signs array", data);
                console.log("array length", data.allSigns.length);

                var quizQnA;
                $.get("../public/html/quizQnA.html", function (html_string) {
                    console.log(html_string);
                    quizQnA = html_string;
                    $("#mainBody").html(quizQnA);

                    var signsArr = data.allSigns;
                    var user_id = data.user_id;
                    var queCount = 0;
                    var correctAnsCount = 0;

                    var img = $("#sign_media");
                    var sign_text = $("#sign_text");
                    var submitAns = $("#btn_submit");

                    // load first question
                    console.log("img url", signsArr[queCount].media_path);
                    img.attr("src", signsArr[queCount].media_path);
                    $("#currentScore").text("Score: "+correctAnsCount+"/"+totalQues);
                    submitAns.click(function (ev) {

                        if (sign_text.val().toLowerCase() == signsArr[queCount].text.toLowerCase()) {
                            correctAnsCount += 1;
                        }

                        if (queCount == totalQues - 2) {
                            submitAns.html("Finish");
                        }
                        if (queCount == totalQues - 1) {
                            var dataObj = {
                                'user_id': user_id,
                                'quiz_type': level,
                                'beginner': correctAnsCount,
                                'totalQue': totalQues
                            };

                            if (level == "intermediate") {
                                dataObj = {
                                    'user_id': user_id,
                                    'quiz_type': level,
                                    'intermediate': correctAnsCount,
                                    'totalQue': totalQues
                                };
                            } else if (level == "advanced") {
                                dataObj = {
                                    'user_id': user_id,
                                    'quiz_type': level,
                                    'advanced': correctAnsCount,
                                    'totalQue': totalQues
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
                                    // window.location.href = "/quiz/";
                                    // $("#mainBody").html('');
                                    $("#quizFinish").attr('hidden', false);
                                    $("#quizScore").text("You have successfully completed this quiz. You score is "+correctAnsCount+"/"+totalQues);
                                    $("#btnRedirect").click(function (){
                                        window.location.href = "/quiz/";
                                    });
                                },
                                error: function (data) {
                                    // $("#mainBody").html(data);
                                    console.log("back from progress", data.status);
                                    console.log("back from progress", data.responseText);
                                }
                            });
                        } else {

                            queCount += 1;

                            img.attr("src", signsArr[queCount].media_path);
                            $("#currentScore").text("Score: "+correctAnsCount+"/"+totalQues);
                            console.log("Correct answers:", correctAnsCount);
                            console.log("question number:", queCount);
                            console.log("img url", signsArr[queCount].media_path);
                        }
                    });

                }, 'html');



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