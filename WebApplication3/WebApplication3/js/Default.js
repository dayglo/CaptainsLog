﻿function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function addSpinner(id) {

    var opts = {
        lines: 8, // The number of lines to draw
        length: 0, // The length of each line
        width: 3, // The line thickness
        radius: 3, // The radius of the inner circle
        color: '#000', // #rgb or #rrggbb
        speed: 1.7, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true // Whether to use hardware acceleration
    };
    var target = document.getElementById(id);
    var spinner = new Spinner(opts).spin(target);
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


    $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Save": function () {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength(text, "Text", 3, 4096);
                //bValid = bValid && checkLength(email, "email", 6, 80);
                //bValid = bValid && checkLength(password, "password", 5, 16);

                //bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                //bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
                //bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

                if (bValid) {
                    
                    //add to db.
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

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
                        $('#output').append(' <button type="button" id="Btn_anno_' + env2.VCServer + '">Annotate selected events</button>');
                        $("#Btn_anno_" + env2.VCServer).button();
                        $("#Btn_anno_" + env2.VCServer).click(function () {
				            $( "#dialog-form" ).dialog( "open" );
			            });
                        $("#Btn_anno_" + env2.VCServer).button("disable");



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
                    $('#table_' + env).append('<tr class="data">' +
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
                    //this bit groups the rows according to the investigation id.
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

                            if (sGroup != 0) {
                                if (sGroup != sLastGroup) {
                                    var nGroup = document.createElement('tr');
                                    var nCell = document.createElement('td');
                                    nCell.colSpan = iColspan;
                                    nCell.className = "group";

                                    nCell.innerHTML += '<span class=spinner id="inv_' + env + '_' + sGroup + '"></span><em> Loading Investigation #' + sGroup + '</em>';
                                    nGroup.appendChild(nCell);
                                    nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);

                                    addSpinner("inv_" + env + "_" + sGroup);
                                    //investigation loading code goes here. sGroup holds the investigationID.

                                    sLastGroup = sGroup;
                                }
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

                //$('.group').empty();



                $("tbody").selectable({
                    filter: 'td',
                    selected: function (event, ui) {
                        $(ui.selected).siblings().addClass('ui-selected');

                    },
                    unselected: function (event, ui) {
                        $(ui.unselected).siblings().removeClass('ui-selected');
                    },

                    stop: function (event, ui) {

                        //enable and disabled the button annotate button depending on if any cells are selected.
                        if ($("td.ui-selected").length > 0) {
                            $("#Btn_anno_" + this.parentElement.id.substring(6)).button("enable");
                        } else {
                            $("#Btn_anno_" + this.parentElement.id.substring(6)).button("disable");
                        }
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

