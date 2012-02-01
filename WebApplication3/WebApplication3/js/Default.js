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
    if (startDate == undefined) {

        var targetDate = new Date();
        var dayOfWeek = targetDate.getDay();

        switch (true) {
            //monday            
            case (dayOfWeek == 1):
                targetDate.setDate(targetDate.getDate() - 3);
                break;
            //sunday            
            case (dayOfWeek == 0):
                targetDate.setDate(targetDate.getDate() - 2);
                break;
            //rest of week            
            default:
                targetDate.setDate(targetDate.getDate() - 1);
                break;
        }
        targetDate.setHours(17, 00, 00, 00);
        startDate = targetDate.toString().substr(4, 20);
    }
    if (endDate == undefined) { endDate = new Date().toString().substr(4, 20) }


    //click handler for table rows
    //$('tr').click(function () {
    //    alert("ed");
    //    if ($(this).hasClass('row_selected'))
    //        $(this).removeClass('row_selected');
    //    else
    //        $(this).addClass('row_selected');
    //});

    //make tr selectable
    


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


     var ReportsToRequest = {
        "ReportingAreas": [
            {
                "Name": "Heritage HBOS",
                "Environments": [
                    { "name": "Infra", "VCServer": "infrp0101" },
                    { "name": "Preprod", "VCServer": "infrp0100" },
                    { "name": "Prod", "VCServer": "infrl0100" }
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

                        $('#output').append('<div id="data_' + env2.VCServer + '"></div><div id="comments_' + env2.VCServer + '"> &nbsp </div>');
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
                $('#' + location).append('<table id="table_' + env + '" class="display table-striped table-bordered table-condensed"></table');

                //create the table heading row
                $('#table_' + env).append('<thead><tr><!--<th colspan="6" id="' + env + '">' + env + '</th>--></tr><tr>' +
                '   <td>InvestigationID</td>' +
                '   <td>Time</td>' +
                '   <td>Event</td>' +
                '   <td>#</td>' +
                '   <td>Host</td>' +
                '   <td>Cluster</td>' +
                //'   <td> Id</td>' +
                

                '</tr></thead><tbody>');

                //render the data

                $.each(les, function (index, le) {
                    $('#table_' + env).append('<tr>' +
                    '   <td>' + le.InvestigationID + '</td>' +
                    '   <td>' + le.Time + '</td>' +
                    '   <td>' + le.Event + '</td>' +
                    '   <td>' + le.Occurrences + '</td>' +
                    '   <td>' + le.Host + '</td>' +
                    '   <td>' + le.Cluster + '</td>' 
                    
                    );
                });

                //close the table body
                $('#table_' + env).append("</tbody>");

                $('#table_' + env).dataTable({
                    "bPaginate": false,
                    "bJQueryUI": true,
                    "bFilter": false, 
                    "bInfo": false,

                    "fnDrawCallback": function (oSettings) {
                        if (oSettings.aiDisplay.length == 0) {
                            return;
                        }

                        var nTrs = $('#table_' + env + ' tbody tr');
                        var iColspan = nTrs[0].getElementsByTagName('td').length;
                        var sLastGroup = "";
                        for (var i = 0; i < nTrs.length; i++) {
                            var iDisplayIndex = oSettings._iDisplayStart + i;
                            var sGroup = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[0];
                            if (sGroup != sLastGroup) {
                                var nGroup = document.createElement('tr');
                                var nCell = document.createElement('td');
                                nCell.colSpan = iColspan;
                                nCell.className = "group";
                                nCell.innerHTML = sGroup;
                                nGroup.appendChild(nCell);
                                nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);
                                sLastGroup = sGroup;
                            }
                        }
                    },
                    "aoColumnDefs": [
                        { "bVisible": false, "aTargets": [0] }
                    ],
                    "aaSortingFixed": [[0, 'asc']],
                    "aaSorting": [[1, 'asc']],
                    "sDom": 'lfr<"giveHeight"t>ip'


                });



                $("tbody").selectable({
                    filter: 'td',
                    selected: function (event, ui) {
                        $(ui.selected).siblings().addClass('ui-selected');
                    },
                    unselected:function(event,ui) {
                        $(ui.unselected).siblings().removeClass('ui-selected');
                    }
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

