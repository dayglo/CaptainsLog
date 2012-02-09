var currentInvID = -1;

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



    var text = $("#InvestigationText"),
    //email = $("#email"),
    //password = $("#password"),
		allFields = $([]).add(text);  //.add(email).add(password),


    $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 700,
        modal: true,
        buttons: {
            "Save": function () {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                //get all entry IDs from the selected rows in the focused table.
                var entries = [];
                $(".focusedTable td").filter(".ui-selected.cell_EntryID").each(function (i, td) {
                    entries.push(td.innerHTML);
                });

                //add to db.
                var investigation = {
                    "InvestigationEntry": {
                        "InvestigationID": currentInvID,
                        "Text": text[0].value,
                        "Complete": false,
                        "KnownError": false,
                        "SupportRef": "test00001",
                        //for each selected table 
                        "EntryIDs": entries
                    }
                }

                $.ajax({
                    type: "POST",
                    url: "Service.asmx/NewInvestigation",
                    data: JSON.stringify(investigation),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        alert("submitted successfully. reloading table...");
                        GetPostsIntoTable($(".focusedTable").attr('id'), "data_" + $(".focusedTable").attr('id'), startDate, endDate);
                        var i = 1;
                    },
                    failure: function (msg) {
                        alert(msg);
                    }
                });

                $(this).dialog("close");

            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            //allFields.val("").removeClass("ui-state-error");
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
                        //write the name of the VC
                        $('#output').append('<h3>' + env2.name + ' [VC:' + env2.VCServer + ']</h3>');

                        $('#output').append('<div class="buttonrow">' +

                        //show all and hide all buttons
                        '<div class="btn-group" style="float:left;">'+
                        '<a id="Btn_showall_' + env2.VCServer + '"class="btn "><i class="icon-chevron-down"></i> All</a>' +
                        '<a id="Btn_hideall_' + env2.VCServer + '"class="btn"><i class="icon-chevron-up"></i> All</a>' +
                        '</div> '+
                        //Create button html
                        //$('#output').append(' <button type="button" id="Btn_anno_' + env2.VCServer + '">Annotate selected events</button>');
                        ' <a class="btn btn-disabled" id="Btn_anno_' + env2.VCServer + '">Annotate selected events</button>' +
                        '</div>');

                        //add a click handler which hides the rows
                        $('#Btn_hideall_' + env2.VCServer).click(function () {
                            $('a.rowhider').each(function () {
                                if (!($(this).hasClass('rowshidden'))) {
                                    $(this).trigger('click');
                                }
                            });
                        });

                        //add a click handler which unhides the rows
                        $('#Btn_showall_' + env2.VCServer).click(function () {
                            $('a.rowhider').each(function () {
                                if ($(this).hasClass('rowshidden')) {
                                    $(this).trigger('click');
                                }
                            });
                        });


                        //Initialise jquery button class magickery 
                        //$("#Btn_anno_" + env2.VCServer).button();
                        //$("#Btn_anno_" + env2.VCServer).button("disable");

                        //render the table
                        $('#output').append('<div id="data_' + env2.VCServer + '"></div><div id="comments_' + env2.VCServer + '"> &nbsp </div>');
                        GetPostsIntoTable(env2.VCServer, "data_" + env2.VCServer, startDate, endDate);

                        //add handler to the button
                        $("#Btn_anno_" + env2.VCServer).click(function () {
                            $('table').removeClass('focusedTable');
                            $("table#" + env2.VCServer).addClass('focusedTable');
                            //$('#InvestigationText').empty();
                            currentInvID = -1;
                            $("#dialog-form").dialog("open");
                        });
                    }
                );
            }
        );
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
            $('#' + location).empty();

            var les = response.d;

            if (les.length != 0) {

                //Create the table header
                $('#' + location).append('<table id="' + env + '" class="display table-striped table-bordered table-condensed"></table');

                //create the table heading row
                $('table#' + env).append('<thead><tr><!--<th colspan="6" id="' + env + '">' + env + '</th>--></tr><tr>' +
                '   <td>InvestigationID</td>' +
                 '  <td>EntryID</td>' +
                '   <td>Time</td>' +
                '   <td>Event</td>' +
                '   <td>#</td>' +
                '   <td>Host</td>' +
                '   <td>Cluster</td>' +
                //'   <td> Id</td>' +


                '</tr></thead><tbody>');

                //render the data


                $.each(les, function (index, le) {
                    var rowTag = '<tr class="data">';
                    if (le.InvestigationID != 0) {
                        rowTag = '<tr class="data investigated inv_' + le.InvestigationID + '">';

                    }

                    $('table#' + env).append(rowTag +
                    '   <td>' + le.InvestigationID + '</td>' +
                    '   <td class="cell_EntryID">' + le.EntryID + '</td>' +
                    '   <td>' + le.Time + '</td>' +
                    '   <td>' + le.Event + '</td>' +
                    '   <td>' + le.Occurrences + '</td>' +
                    '   <td>' + le.Host + '</td>' +
                    '   <td>' + le.Cluster + '</td></tr>'
                    );
                });

                //close the table body
                $('table#' + env).append("</tbody>");

                $('table#' + env).dataTable({
                    "bPaginate": false,
                    "bJQueryUI": true,
                    "bFilter": false,
                    "bInfo": false,
                    //this bit groups the rows according to the investigation id.
                    "fnDrawCallback": function (oSettings) {

                        //alert('DataTables has redrawn the table');

                        if (oSettings.aiDisplay.length == 0) {
                            return;
                        }

                        var nTrs = $('table#' + env + ' tbody tr');
                        var iColspan = nTrs[0].getElementsByTagName('td').length;
                        var sLastGroup = "";
                        for (var i = 0; i < nTrs.length; i++) {
                            var iDisplayIndex = oSettings._iDisplayStart + i;
                            var sGroup = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[0]; // 0 for the first cell in the row, which is investigation id.

                            if (sGroup != 0) {
                                if (sGroup != sLastGroup) {
                                    var nGroup = document.createElement('tr');
                                    var nCell = document.createElement('td');
                                    nCell.colSpan = iColspan;
                                    nCell.className = "group";

                                    nCell.innerHTML += '<span class=spinner id="inv_' + env + '_' + sGroup + '"></span> <em> Loading Investigation #' + sGroup + '</em>';
                                    nGroup.appendChild(nCell);
                                    nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);

                                    addSpinner("inv_" + env + "_" + sGroup);

                                    //Load the investigation details into the header row, and set up the row so that it has behaviour (rolling up and down)

                                    var DTO = { "id": sGroup };
                                    $.ajax({
                                        async: false,
                                        type: "POST",
                                        url: "Service.asmx/GetInvestigation",
                                        data: JSON.stringify(DTO),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",

                                        success: function (response) {
                                            var invEntry = response.d;

                                            //add the nice chevron, with the correct ID< so that when it gets clicked it can rollup the right rows
                                            nCell.innerHTML = '<a class="btn rowhider" id="rowhider_' + invEntry.InvestigationID + '"  style="float:left;"><i class="icon-chevron-up"></i></a>' +
                                                               '<a class="btn" id="edit_btn_' + invEntry.InvestigationID + '"  style="float:left;margin-right: 6px; "><i class="icon-pencil"></i></a>' +
                                                              
                                                              '<div class="investigationHeaderText">' + invEntry.Text.replace(/\n/g, "<br/>") + "</div>";


                                            //add a click handler which hides and unhides the rows
                                            $("#rowhider_" + invEntry.InvestigationID).click(function () {
                                                if ($(this).hasClass('rowshidden')) {
                                                    //show

                                                    $('.inv_' + invEntry.InvestigationID).show('slow');
                                                    $(this).html('<i class="icon-chevron-up"></i>');
                                                    $(this).removeClass('rowshidden');
                                                    $(this).parent().children('div.investigationHeaderText').removeClass('collapsed-text');
                                                } else {
                                                    //hide
                                                    $('.inv_' + invEntry.InvestigationID).hide("fast");
                                                    $(this).html('<i class="icon-chevron-down"></i>');
                                                    $(this).addClass('rowshidden');
                                                    $(this).parent().children('div.investigationHeaderText').addClass('collapsed-text');
                                                }
                                            });

                                            //add a handler to the investigation text edit button

                                            $("#edit_btn_" + invEntry.InvestigationID).click(function () {
                                                $('table').removeClass('focusedTable');
                                                $(this).closest('table').addClass('focusedTable');
                                                var text = $(this).parent().children('div.investigationHeaderText').html();
                                                $('#InvestigationText').html(text);
                                                //$('#InvestigationText').html

                                                currentInvID = invEntry.InvestigationID;
                                                $("#dialog-form").dialog("open");
                                            });

                                        },

                                        failure: function (msg) {
                                            alert(msg);
                                        }

                                    });

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

                //make rows selectable

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
                            $("#Btn_anno_" + this.parentElement.id).button("enable");
                        } else {
                            $("#Btn_anno_" + this.parentElement.id).button("disable");
                        }
                    }
                });

                //make group header rows unselectable

                //$("td.group").unselectable();  //this isnt working

            } else {
                $('#' + location).append("<p>No Data</p>");
            }

        },
        failure: function (msg) {
            $('#' + location).text(msg);
        }
    });
}

