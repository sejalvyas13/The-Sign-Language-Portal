(function ($) {
    var username = $("#username");
    var msgContainer = $("#unError");
    var signupBtn = $("#signupBtn");

    msgContainer.attr('hidden', true);
    signupBtn.attr('disabled', true);
    username.focusout(function () {

        $.ajax({
            url: "/signup/checkUser",
            type: 'post',
            dataType: 'json',
            data: { "username": username.val() },
            success: function (data) {
                console.log("back from usercheck", data);                

                if (data.message == "") {
                    signupBtn.attr('disabled', false);
                    msgContainer.attr('hidden', true);
                } else {
                    signupBtn.attr('disabled', true);
                    msgContainer.text(data.message);
                    msgContainer.attr('hidden', false);
                }
            },
            error: function (data) {
                console.log("back from usercheck", data.status);
                console.log("back from usercheck", data.responseText);
            }
        });
    });
})(window.jQuery);