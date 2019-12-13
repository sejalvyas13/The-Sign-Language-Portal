(function($) {
  
    var approveOrRejectSubmit = $(".approveOrReject");

    approveOrRejectSubmit.click(function(ev){
        ev.preventDefault()// cancel form submission

        var index = $(this).attr('name');
        var sl_level =$("#sl_level"+index+" :selected").val();
        var sl_status = $("#sl_status"+index+" :selected").val(); 
        var contribution_id = $("#contribution_id"+index).val(); //$('contribution_id').val();
        // $("#req"+index).submit(function(e) {
    
        //get the action-url of the form
        // var actionurl = e.currentTarget.action;
        var data = {'sl_level':sl_level, 'sl_status': sl_status, 'contribution_id':contribution_id}
    //     $.post( '/contributions/pendingContributions', data, function(data) {
    //         // ... do something with response from server
    //       },
    //       'json' // I expect a JSON response
    //    );

        //do your own request an handle the results
        $.ajax({
                url: "/contributions/pendingContributions",
                type: 'post',
                dataType: 'json',
                data: {'sl_level':sl_level, 'sl_status': sl_status, 'contribution_id':contribution_id},
                success: function(data) {
                    console.log(data);
                    if(data.status == 200){
                        $("#req"+index).remove();
                        // alert('hmm');
                    }
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