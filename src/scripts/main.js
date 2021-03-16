console.log("Hello fellow developer! You know, I'm something of a web dev myself :)");

var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;


$(document).ready(function () {
    if (isSafari) {
        $('#preview_resume_btn').attr("download", "")
    }
})

$('.contact-form').on('submit', function (e) {
    sendEMAIL();

    e.preventDefault();
});



function sendEMAIL() {
    $('#contact-form-spinner').show();
    $('#email-modal-label').text("Form submitted!");
    $('#email-bodal-body').text("Thanks for filling out the form! It will be processed in a second!");
    $('#email-modal').modal('show');

    var URL = "https://contact.philipdolenko.ml";

    var name = $("#name-input").val();
    var token = $("#token").val();
    var email = $("#email-input").val();
    var desc = $("#description-input").val();
    var data = {
        name: name,
        email: email,
        token: token,
        desc: desc
    };

    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),

        success: function (e) {
            $('#email-modal').modal('show');
            $('#contact-form-spinner').hide();

            if(e && e.errorMessage != undefined) {
                $('#email-modal-label').text("Error: Message is not sended");
                $('#email-bodal-body').text("Please try again, or contact me via email");
            } else {
                $('#email-modal-label').text("Thank you for getting in touch!");

                var obj = $('#email-bodal-body').text("Message was sent successfully.\nI will get back in touch with you soon!\n\nHave a great day!");
                obj.html(obj.html().replace(/\n/g,'<br/>'));

                $("#contact-form")[0].reset();
            }
            console.log("res: "+ e);
            refreshToken();
        },
        error: function () {
            $('#contact-form-spinner').hide();
            $('#email-modal-label').text("Error: Message is not sended");
            $('#email-bodal-body').text("Please try again, or contact me via email");
            refreshToken();
        }
    });
}

function refreshToken(){
    grecaptcha.execute('6Lek94AaAAAAAOK4H6t3IN_oHAbV_E08YnXVsNkV', { action: 'homepage' }).then(function (token) {
        console.log('refreshed token:', token);
        document.getElementById("token").value = token;
      });
}