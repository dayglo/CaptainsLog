//$(document).ready(function () {
    // Add the page method call as an onclick handler for the div.//
//    $("#Result").click(function () {
 //       $.ajax({
 //           type: "POST",
//            url: "Default.aspx/GetDate",
//            data: "{}",
 //           contentType: "application/json; charset=utf-8",
 //           dataType: "json",
//            success: function (msg) {
////                // Replace the div's content with the page method's return.
//                  $("#Result").text(msg.d);
//            }
 //       });
//    });
// });


$(function () {

    $('#Button1').click(getPosts);

});

function getPosts() {
    $.ajax({
        type: "POST",
        url: "Service.asmx/GetEntries",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var les = response.d;
            $('#output').empty();
            $.each(les, function (index, le) {
                $('#output').append('<p><strong>Entry: ' + le.Event + '</strong><br /> Id: ' +
                                  le.EntryID + '<br />Host: ' +
                                le.Host + '<br />Occurrences: ' +
                                le.Occurrences + '</p>');
            });
        },
        failure: function (msg) {
            $('#output').text(msg);
        }
    });
}