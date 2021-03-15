console.log("Hello fellow developer! You know, I'm something of a web dev myself :)");
console.log("LOl");


$("#contact-btn").click(function () {
    sendEMAIL();
});
$('.contact-form').on('submit', function () {
    sendEMAIL();
    return false;
});

var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;


$(document).ready(function () {
    if (isSafari) {
        $('#preview_resume_btn').attr("download", "")
    }
})



function sendEMAIL() {
    alert('Form submitted!');
    var name = $("#name-input").val();
    var phone = "+380984139224";
    var email = $("#email-input").val();
    var desc = $("#description-input").val();
    var data = {
        name: name,
        phone: phone,
        email: email,
        desc: desc
    };

    var createCORSRequest = function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Most browsers.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // IE8 & IE9
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };

    var url = 'https://contact.philipdolenko.ml';
    var method = 'POST';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        // Success code goes here.
    };

    xhr.onerror = function () {
        // Error code goes here.
    };

    xhr.send(JSON.stringify(data));

    // var URL = "https://contact.philipdolenko.ml";

    // var name = $("#name-input").val();
    // var phone = "+380984139224";
    // var email = $("#email-input").val();
    // var desc = $("#description-input").val();
    // var data = {
    //     name: name,
    //     phone: phone,
    //     email: email,
    //     desc: desc
    // };

    // $.ajax({
    //     type: "POST",
    //     url: URL,
    //     dataType: "json",
    //     crossDomain: "true",
    //     contentType: "application/json; charset=utf-8",
    //     data: JSON.stringify(data),


    //     success: function () {
    //         // clear form and show a success message
    //         alert("Successfull");
    //         document.getElementById("contact-form").reset();
    //         location.reload();
    //     },
    //     error: function () {
    //         // show an error message
    //         alert("UnSuccessfull");
    //     }
    // });

}