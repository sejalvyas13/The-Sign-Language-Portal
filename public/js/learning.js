(function() {
    var counter = 0;
    $('#learnSign').on('click', function(){
        counter++; 
        var language = $('#language_type').text();
        var level = $('#level').text();
        var requestConfig = {
            method: "POST",
            url: "/learning/card",
            data : {language : language,
                    level : level,
                    counter : counter}
          };
          $.ajax(requestConfig).then(function(responseMessage) {
                console.log(responseMessage);
                var signsData = responseMessage;
                var counter = 1;
                //$("#mainBody").html(JSON.stringify(responseMessage));
                $("#mainBody").html(
                    '<link rel="stylesheet" href="/public/css/learning.css"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-back"><img id="imgId" src="" alt="" style="width:300px;height:300px;"></div><div class="flip-card-front"><h1 id="language_type"></h1> <h2 id="signText"></h2> <p>Level : </p> <span id="level"></span></div></div></div><button id="learnNext" type="submit">Next</button>    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="crossorigin="anonymous"></script><script src="/public/js/learning.js"></script>'
                );

                var img = $('#imgId')
                var language_type = $('#language_type')
                var level = $('#level')
                var signText = $('#signText')  
                var learnNextBtn = $('#learnNext')              

                img.attr("src", signsData[counter].media_path);
                language_type.text(signsData[counter].language_type);
                level.text(signsData[counter].level);
                signText.text(signsData[counter].text);

                var dataObj = {
                    level : signsData[0].level,
                    //user_id: "5df3f5d757dc2a83982dc82e",
                    sign_id: signsData[0]._id,
                    learningScore:1 
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

                learnNextBtn.click(function(event){
                    counter++; 
                    //TODO : Update progress here
                    img.attr("src", signsData[counter].media_path);
                    language_type.text(signsData[counter].language_type);
                    level.text(signsData[counter].level);
                    signText.text(signsData[counter].text); 

                    var dataObj = {
                        level : signsData[counter].level,
                        //user_id: "5df3f5d757dc2a83982dc82e",
                        sign_id: signsData[counter]._id,
                        learningScore:counter+1 
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

                });


          });
    });
      
  })();
  