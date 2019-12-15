(function () {
    var counter = 0;


    $('#learnSign').on('click', function () {
        counter++;
        var language = $('#language_type').text();
        var level = $('#level').text();
        var requestConfig = {
            method: "POST",
            url: "/learning/card",
            data: {
                language: language,
                level: level,
                counter: counter
            }
        };
        $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage);
            var signsData = responseMessage;
            var totalSigns = signsData.length;
            console.log("array length", totalSigns);

            if (totalSigns == 1) {
                // learningDone.click();
                window.location.href = '/learning/completed/';
            } else {
                var counter = 1;
                //$("#mainBody").html(JSON.stringify(responseMessage));
                $("#mainBody").html(
                    '<link rel="stylesheet" href="/public/css/learning.css"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-back"><img id="imgId" src="" alt="" style="width:300px;height:300px;"></div><div class="flip-card-front"><span id="language_type"></span> <h1 id="signText"></h1> <span>Level : </span> <span id="level"></span></div></div></div><button id="learnNext" type="submit">Next</button><button id="learningDone" type="button">Done for today!</button>    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="crossorigin="anonymous"></script><script src="/public/js/learning.js"></script>'
                );

                var learningDone = $("#learningDone");

                $("#learningDone").on('click', function () {
                    console.log("learning Done clicked!");
                    window.location.href = '/dashboard/';
                });

                var img = $('#imgId');
                var language_type = $('#language_type');
                var level = $('#level');
                var signText = $('#signText');
                var learnNextBtn = $('#learnNext');

                // learningDone.attr("hidden", false);

                img.attr("src", signsData[counter].media_path);
                language_type.text(signsData[counter].language_type);
                level.text(signsData[counter].level);
                signText.text(signsData[counter].text);

                var dataObj = {
                    level: signsData[0].level,
                    //user_id: "5df3f5d757dc2a83982dc82e",
                    sign_id: signsData[0]._id,
                    learningScore: 1
                };

                $.ajax({
                    url: "/progress/learningProgress",
                    type: 'post',
                    dataType: 'json',
                    data: dataObj,
                    success: function (data) {
                        console.log("back from progress", data);
                        //window.location.href = "/learning/card";
                    },
                    error: function (data) {
                        console.log("back from progress", data.status);
                        console.log("back from progress", data.responseText);
                    }
                });

                learnNextBtn.click(function (event) {

                    if (counter == totalSigns - 2) {
                        learnNextBtn.html("Finish");
                    }

                    if (counter == totalSigns - 1) {
                        // learningDone.click();
                        window.location.href = '/learning/completed/';
                    } else {

                        counter += 1;
                        console.log("learning counter:", counter);
                        console.log("media path", signsData[counter].media_path);
                        //TODO : Update progress here
                        img.attr("src", signsData[counter].media_path);
                        language_type.text(signsData[counter].language_type);
                        level.text(signsData[counter].level);
                        signText.text(signsData[counter].text);

                        var dataObj = {
                            level: signsData[counter].level,
                            //user_id: "5df3f5d757dc2a83982dc82e",
                            sign_id: signsData[counter]._id,
                            learningScore: counter
                        };

                        $.ajax({
                            url: "/progress/learningProgress",
                            type: 'post',
                            dataType: 'json',
                            data: dataObj,
                            success: function (data) {
                                console.log("back from progress", data);
                            },
                            error: function (data) {
                                console.log("back from progress", data.status);
                                console.log("back from progress", data.responseText);
                            }
                        });
                    }

                });
            }

        });

    });

})(window.jQuery);
