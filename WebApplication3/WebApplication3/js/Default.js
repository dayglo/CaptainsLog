function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}





//var startDate = new Date();
//var endDate = new Date();


$(document).ready(function () {

    //If there is no startdate or enddate, set them to be the period since the last working day
    startDate = getUrlVars()["startDate"];
    endDate = getUrlVars()["endDate"];
    if (startDate == undefined) { startDate = "1/14/2012 10:00" }
    if (endDate == undefined) { endDate = new Date().toString() }

    //click handler for table rows
    $('tr').click(function () {
        alert("ed");
        if ($(this).hasClass('row_selected'))
            $(this).removeClass('row_selected');
        else
            $(this).addClass('row_selected');
    });

    var ReportsToRequest = {
        "ReportingAreas": [
            {
                "Name": "Heritage HBOS",
                "Environments": [
                    { "name": "Infra", "VCServer": "infrp0101" },
                    { "name": "Preprod", "VCServer": "infrp0100" },
                    { "name": "Prod", "VCServer": "infrl0100" }
                ]
            },
            {
                "Name": "Distributed Platform Readiness (DPR)",
                "Environments": [
                    { "name": "Preprod - PB2", "VCServer": "preprodpb2" },
                    { "name": "Preprod - PB3", "VCServer": "preprodpb3" },
                    { "name": "Live - PB2", "VCServer": "prodpb2" },
                    { "name": "Live - PB3", "VCServer": "prodpb3" }
                ]
            },
            {
                "Name": "Strategic Development Infrastructure (SDI)",
                "Environments": [
                    { "name": "Preprod", "VCServer": "preprodsdipb2" },
                    { "name": "Live - PB2 #1", "VCServer": "prodsdipb2_1" },
                    { "name": "Live - PB2 #2", "VCServer": "prodsdipb2_2" },
                    { "name": "Live - PB3 #1", "VCServer": "prodsdipb3_1" },
                    { "name": "Live - PB3 #2", "VCServer": "prodsdipb3_2" }
                ]
            },
            {
                "Name": "Distributed Services Pre-Provisioning (DSPP)",
                "Environments": [
                    { "name": "Preprod", "VCServer": "proddspp" },
                    { "name": "Live", "VCServer": "e2eassurance" }
                ]
            }
        ]
    }





    $('#Button1').click(function () {



        // Populate everything
        //====================


        $('#output').empty();
        $('#output').append('<h1>VMware Health Check</h2>');
        $.each(
        //For each reporting area
            ReportsToRequest.ReportingAreas,
            function (i, area) {
                //...write the area name
                $('#output').append('<h2>' + area.Name + '</h2>');
                $.each(
                //for each environment in the reporting area
                    area.Environments,
                    function (i2, env2) {
                        //write the name and connect to the webservice to get all the data
                        $('#output').append('<h3>' + env2.name + ' [VC:' + env2.VCServer + ']</h3>');

                        $('#output').append('<div id="data_' + env2.VCServer + '"></div><div id="comments_' + env2.VCServer + '"></div>');
                        GetPostsIntoTable(env2.VCServer, "data_" + env2.VCServer, startDate, endDate);
                    }
                );
            }
        );



        // 

    });

});



function GetPostsIntoTable(env,location,start,end) {

    var LogRequest = {}

    LogRequest.startDate = start;
    LogRequest.endDate = end;
    if (!env) {
        LogRequest.environment = "prodpb2";
    } else {
        LogRequest.environment = env;
    }


    var DTO = {'LogRequest' : LogRequest};

    $.ajax({
        type: "POST",
        url: "Service.asmx/GetEntries",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            var les = response.d;

            if (les.length != 0) {

                //Create the table header
                $('#' + location).append('<table id="table_' + env + '" class="display"></table');

                //create the table heading row
                $('#table_' + env).append('<thead><tr><!--<th colspan="6" id="' + env + '">' + env + '</th>--></tr><tr>' +
                '   <td>Time</td>' +
                '   <td>Event</td>' +
                '   <td>#</td>' +
                '   <td>Host</td>' +
                '   <td>Cluster</td>' +
                //'   <td> Id</td>' +
                '   <td>InvestigationID</td>' +

                '</tr></thead><tbody>');

                //render the data

                $.each(les, function (index, le) {
                    $('#table_' + env).append('<tr>' +
                    '   <td>' + le.Time + '</td>' +
                    '   <td>' + le.Event + '</td>' +
                    '   <td>' + le.Occurrences + '</td>' +
                    '   <td>' + le.Host + '</td>' +
                    '   <td>' + le.Cluster + '</td>' +
                    '   <td>' + le.InvestigationID + '</td>'
                    );
                });

                //close the table body
                $('#table_' + env).append("</tbody>");

                $('#table_' + env).dataTable({
                    "bPaginate": false,
                    "bJQueryUI": true
                });

        } else {
            $('#' + location).append("<p>No Data</p>");
        }

    },
    failure: function (msg) {
        $('#' + location).text(msg);
    }
});
}

