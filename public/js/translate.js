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
      document.getElementById('spoken').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
      var requestConfig = {
        method: "POST",
        url: "/signs/fromText",
        data : {text : interimTranscript}
      };
      if (interimTranscript.trim()){
        $.ajax(requestConfig).then(function(responseMessage) {
            var newElement = $(responseMessage);
            document.getElementById('spoken').innerHTML = newElement;
            var x = document.createElement("IMG");
            x.setAttribute("src", responseMessage.media_path);
            x.setAttribute("width", "304");
            x.setAttribute("height", "228");
            x.setAttribute("alt", interimTranscript);
            document.body.appendChild(x);
        });
      }
    }
    recognition.start();
    
    $('#stop').on('click', function(){
        recognition.stop()
    }); 
      
  })();
  