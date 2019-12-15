(function() {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
        if(interimTranscript.trim() == 'stop'){
            recognition.stop()
        }
      }
      
      $('spoken').html(interimTranscript);
      var requestConfig = {
        method: "POST",
        url: "/signs/fromText",
        data : {text : interimTranscript}
      };
      if (interimTranscript.trim()){
        // $.ajax(requestConfig).then(function(responseMessage) {
        //     var newElement = $(responseMessage);
        //     document.getElementById('spoken').innerHTML = responseMessage.text;
        //     /**TODO : Convert this piece into jquery */
        //     if(document.getElementById('aslImg')){
        //         x = document.getElementById('aslImg');
        //         x.setAttribute("src", responseMessage.media_path);
        //         x.setAttribute("width", "304");
        //         x.setAttribute("height", "228");
        //         x.setAttribute("id", "aslImg");
        //         x.setAttribute("alt", interimTranscript);
        //         x.setAttribute("style", "margin-left: 400px; margin-top:100px;");
        //         //document.body.appendChild(x);  
        //         document.getElementById('signObj').appendChild(x);
        //     }
        //     else{
        //         var x = document.createElement("IMG");
        //         x.setAttribute("src", responseMessage.media_path);
        //         x.setAttribute("width", "304");
        //         x.setAttribute("height", "228");
        //         x.setAttribute("id", "aslImg");
        //         x.setAttribute("alt", interimTranscript);
        //         x.setAttribute("style", "margin-left: 400px; margin-top:100px;");
        //         //document.body.appendChild(x);
        //         document.getElementById('signObj').appendChild(x);

        //     }
        // });

        $.ajax({
          url: "/signs/fromText",
          type: 'post',
          dataType: 'json',
          data : {text : interimTranscript.trim()},
          success: function (responseMessage) {
              console.log("In success", responseMessage);
              var newElement = $(responseMessage);
              $('spoken').html(responseMessage.text);
              /**TODO : Convert this piece into jquery */
              if(document.getElementById('aslImg')){
                  if(document.getElementById('errorMessage')){
                    document.getElementById('errorMessage').remove();  
                  }
                  x = document.getElementById('aslImg');
                  x.setAttribute("src", responseMessage.media_path);
                  x.setAttribute("width", "304");
                  x.setAttribute("height", "228");
                  x.setAttribute("id", "aslImg");
                  x.setAttribute("alt", interimTranscript);
                  x.setAttribute("style", "margin-left: 400px; margin-top:100px;");
                  //document.body.appendChild(x);  
                  document.getElementById('signObj').appendChild(x);
              }
              else{
                  if(document.getElementById('errorMessage')){
                    document.getElementById('errorMessage').remove();  
                  }
                  var x = document.createElement("IMG");
                  x.setAttribute("src", responseMessage.media_path);
                  x.setAttribute("width", "304");
                  x.setAttribute("height", "228");
                  x.setAttribute("id", "aslImg");
                  x.setAttribute("alt", interimTranscript);
                  x.setAttribute("style", "margin-left: 400px; margin-top:100px;");
                  //document.body.appendChild(x);
                  document.getElementById('signObj').appendChild(x);

              }
              document.getElementById('listening').innerHTML = "Stopped listening!";
              recognition.stop();
          },
          error: function (data) {
              $('#signObj').empty();
              console.log("In error", data.status);
              console.log(data);
              if(document.getElementById("aslImg")){
                document.getElementById("aslImg").remove();
              }
              if(document.getElementById('errorMessage')){
               var x = document.getElementById('errorMessage');
                x.innerHTML = "Sorry we couldn't find that sign! We're constantly trying to improve!";
                document.getElementById('signObj').appendChild(x);
              }
              else{
                var x = document.createElement("div");
                  x.setAttribute("id", "errorMessage");
                  x.innerHTML = "Sorry we couldn't find that sign! We're constantly trying to improve!";
                document.getElementById('signObj').appendChild(x);
              }
              document.getElementById('listening').innerHTML = "Stopped listening!";
              recognition.stop()
          }
        });

      }
    }
    recognition.start();
    
    $('#stop').on('click', function(){
        document.getElementById('listening').innerHTML = "Not listening!";
        recognition.stop()
    }); 

    $('#start').on('click', function(){
      $('#signObj').empty();
      document.getElementById('listening').innerHTML = "Listening..";
      recognition.start()
  }); 
      
  })();
  