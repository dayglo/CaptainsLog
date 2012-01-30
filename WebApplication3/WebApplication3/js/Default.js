


$(function () {

    var ReportsToRequest = {
        "ReportingAreas": [
            {
                "Area":"Heritage HBOS",
                "Environments": [
                    {"name":"Infra","VCServer":"infrp0101"},
                    {"name":"Preprod","VCServer":"infrp0100"},
                    {"name":"Prod","VCServer":"infrl0100"}
                ]
            },
            {
                "Area":"Distributed Platform Readiness (DPR)",
                "Environments": [
                    {"name":"Preprod - PB2","VCServer":"preprodpb2"},
                    {"name":"Preprod - PB3","VCServer":"preprodpb3"},
                    {"name":"Live - PB2","VCServer": "prodpb2"},
                    {"name":"Live - PB3","VCServer": "prodpb3"}
                ]
            },
            {
                "Area":"Strategic Development Infrastructure (SDI)",
                "Environments": [
                    {"name":"Preprod","VCServer":"preprodsdipb2"},
                    {"name":"Live - PB2 #1","VCServer":"prodsdipb2_1"},
                    {"name":"Live - PB2 #2","VCServer":"prodsdipb2_2"},
                    {"name":"Live - PB3 #1","VCServer":"prodsdipb3_1"},
                    {"name":"Live - PB3 #2","VCServer":"prodsdipb3_2"}
                ]
            },
            {
                "Area":"Distributed Services Pre-Provisioning (DSPP)",
                "Environments": [
                    {"name":"Preprod","VCServer":"proddspp"},
                    {"name":"Live","VCServer":"e2eassurance"}
                ]
            }
        ]
    }


    var environments = ["infrp0101", "infrp0100", "infrl0100", "preprodpb2", "preprodpb3", "prodpb2", "prodpb3", "preprodsdipb2", "prodsdipb2_1", "prodsdipb2_2", "prodsdipb3_1", "prodsdipb3_2", "preproddspp", "proddspp", "e2eassurance"];
    var startDate = "1/14/2012 10:00";
    var endDate = "1/15/2012 11:00";


    $('#Button1').click(function(){
        $('#output').empty();
        
        $.each(
            environments,
            function (intIndex, objValue) {
                $('#output').append('<table id="table_'+ objValue +'"></table><div id="pager_'+ objValue +'"></div>');
                getPosts(objValue, startDate, endDate);
            }

        );

    });

});


function GetPosts(env, start, end) {

    var LogRequest = {}

    LogRequest.startDate = start;
    LogRequest.endDate = end;
    if (!env) {
        LogRequest.environment = "prodpb2";
    } else {
        LogRequest.environment = env;
    }

    var DTO = { 'LogRequest': LogRequest };

    jQuery("table_" + env).jqGrid({
        url: "Service.asmx/GetEntries",
        datatype: "json",
        colNames:['Time','Entry','Host'],
        colModel:[
            {name:'Time',index:'Time'},
            {name:'Event',index:'Event'}
        ],
        rowNum:10, 
        rowList:[10,20,30], 
        pager: "#pager_" + env, 
        sortname: 'Time',
        viewrecords: true,
        sortorder: "Time", 
        caption: "JSON Example"

    });
    jQuery("table_" + env).jqGrid('navGrid', "#pager_" + env, { edit: false, add: false, del: false });
}



function getPostsIntoTable(env,start,end) {

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
                $('#output').append('<table id="table_'+ env +'" class="logdata"></table');

                //create the table heading row
                $('#table_' +env).append('<thead><tr><th colspan="6" id="' + env + '">'+env+'</th></tr><tr>' +
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

                //close the table
                $('#table_' + env).append("</tbody>");

            } else {
                $('#output').append("<p>No Data</p>");
            }

        },
        failure: function (msg) {
            $('#output').text(msg);
        }
    });
}