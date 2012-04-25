//Jacwright.com date formatting functions
Date.prototype.format = function (format) { var returnStr = ''; var replace = Date.replaceChars; for (var i = 0; i < format.length; i++) { var curChar = format.charAt(i); if (i - 1 >= 0 && format.charAt(i - 1) == "\\") { returnStr += curChar } else if (replace[curChar]) { returnStr += replace[curChar].call(this) } else if (curChar != "\\") { returnStr += curChar } } return returnStr }; Date.replaceChars = { shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], d: function () { return (this.getDate() < 10 ? '0' : '') + this.getDate() }, D: function () { return Date.replaceChars.shortDays[this.getDay()] }, j: function () { return this.getDate() }, l: function () { return Date.replaceChars.longDays[this.getDay()] }, N: function () { return this.getDay() + 1 }, S: function () { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))) }, w: function () { return this.getDay() }, z: function () { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((this - d) / 86400000) }, W: function () { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7) }, F: function () { return Date.replaceChars.longMonths[this.getMonth()] }, m: function () { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) }, M: function () { return Date.replaceChars.shortMonths[this.getMonth()] }, n: function () { return this.getMonth() + 1 }, t: function () { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, L: function () { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) }, o: function () { var d = new Date(this.valueOf()); d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear() }, Y: function () { return this.getFullYear() }, y: function () { return ('' + this.getFullYear()).substr(2) }, a: function () { return this.getHours() < 12 ? 'am' : 'pm' }, A: function () { return this.getHours() < 12 ? 'AM' : 'PM' }, B: function () { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24) }, g: function () { return this.getHours() % 12 || 12 }, G: function () { return this.getHours() }, h: function () { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12) }, H: function () { return (this.getHours() < 10 ? '0' : '') + this.getHours() }, i: function () { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes() }, s: function () { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds() }, u: function () { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m }, e: function () { return "Not Yet Supported" }, I: function () { return "Not Yet Supported" }, O: function () { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00' }, P: function () { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00' }, T: function () { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result }, Z: function () { return -this.getTimezoneOffset() * 60 }, c: function () { return this.format("Y-m-d\\TH:i:sP") }, r: function () { return this.toString() }, U: function () { return this.getTime() / 1000 } };

$.extend($.expr[':'], {
    inView: function (a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});

//function which allows shiftclicking
(function ($) {
    $.fn.shiftClick = function () {
        var lastSelected;
        var tableRows = $(this);

        this.filter('.data').each(function () {
            $(this).children('td').attr('unselectable', 'on');
            $(this).click(function (ev) {

                if ($(this).hasClass('clicked')) {
                    //clicking a row which was already selected

                    if (ev.shiftKey) {
                        //$(this).siblings().removeClass('clicked');

                        var last = tableRows.index(lastSelected);
                        var first = tableRows.index(this);

                        var start = Math.min(first, last);
                        var end = Math.max(first, last);

                        for (var i = start; i <= end; i++) {
                            if (tableRows[i].children[0].tagName.toLowerCase() == 'td') tableRows[i].setAttribute('class', 'clicked');
                        }

                    } else if (ev.ctrlKey) {
                        $(this).removeClass('clicked');
                    } else {
                        $(this).siblings().removeClass('clicked');
                        $(this).addClass('clicked');
                    }
                } else {
                    //clicking a row which was not already selected
                    if (ev.shiftKey) {
                        var last = tableRows.index(lastSelected);
                        var first = tableRows.index(this);

                        var start = Math.min(first, last);
                        var end = Math.max(first, last);

                        for (var i = start; i <= end; i++) {
                            if (tableRows[i].children[0].tagName.toLowerCase() == 'td') tableRows[i].setAttribute('class', 'clicked');
                        }
                    } else if (ev.ctrlKey) {
                        $(this).addClass('clicked');
                        lastSelected = this;
                    } else {
                        $(this).siblings().removeClass('clicked');
                        $(this).addClass('clicked');

                        lastSelected = this;
                    }
                }
            });
        });
    };
})(jQuery);



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


//set up investigation form object

(function ($) {

    $.fn.initInvestigationForm = function (LogRequest) {

        // create a modal dialog with the data
        $('#dialog-form').modal({
            closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
            //position: ["15%",],
            overlayId: 'inv-overlay',
            containerId: 'inv-container',
            onOpen: function (dialog) {


                var title = "Enter Investigation Details:";

                $('#inv-container .inv-title').html('Loading...');
                dialog.overlay.fadeIn(200, function () {
                    dialog.container.fadeIn(200, function () {
                        dialog.data.fadeIn(200, function () {
                            $('#inv-container .inv-content').animate({
                                height: 280
                            }, function () {
                                $('#inv-container .inv-title').html(title);
                                $('#inv-container form').fadeIn(200, function () {
                                    $('#inv-container #InvestigationText').focus();

                                    //$('#contact-container .contact-cc').click(function () {
                                    //	var cc = $('#contact-container #contact-cc');
                                    //	cc.is(':checked') ? cc.attr('checked', '') : cc.attr('checked', 'checked');
                                    //});


                                });
                            });
                        });
                    });
                });

            },
            onShow: function (dialog) {

                $('#saveInv').on('click', function () {

                    var text = $("#InvestigationText").val();
                    var invID = $("#InvestigationID").html();
                    //get all entry IDs from the selected rows in the focused table, so we can link the investigation to all the correct entries
                    var entries = [];
                    $(".focusedTable tr.clicked td").filter(".cell_EntryID").each(function (i, td) {
                        entries.push(td.innerHTML);
                    });

                    //add investigation to db.
                    var investigation = {
                        "InvestigationEntry": {
                            "InvestigationID": invID,
                            "Text": text,
                            //"Complete": false,
                            //"KnownError": false,
                            //"SupportRef": "test00001",
                            //for each selected table 
                            "EntryIDs": entries,
                            "Modified": new Date().format('M j Y H:i:s')
                        }
                    }

                    $.ajax({
                        type: "POST",
                        url: "Service.asmx/NewInvestigation",
                        data: JSON.stringify(investigation),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {

                            //if the investigation was successfully sent to the server, reload the individual table.
                            GetPostsIntoTable($(".focusedTable").attr('id'), "#data_" + $(".focusedTable").attr('id'), LogRequest.startDate, LogRequest.endDate, LogRequest.reportOnly);

                        },
                        failure: function (msg) {
                            alert(msg);
                        }
                    });

                    $('.modal-close').click();

                });

                 $('#cancelInv').on('click', function () {
                    $('.modal-close').click();
                 });


            },


            close: function (dialog) {
			    //$('#inv-container .inv-message').fadeOut();
			    $('#inv-container .inv-title').html('Goodbye...');
			    $('#inv-container form').fadeOut(200);
			    $('#inv-container .inv-content').animate({
				    height: 40
			    }, function () {
				    dialog.data.fadeOut(200, function () {
					    dialog.container.fadeOut(200, function () {
						    dialog.overlay.fadeOut(200, function () {
							    $.modal.close();
						    });
					    });
				    });
			    });
		    }
        });
    };
})(jQuery);

$(document).ready(function () {

    //disable text selection
    $(function () {
        $.extend($.fn.disableTextSelect = function () {
            return this.each(function () {
                if ($.browser.mozilla) {//Firefox
                    $(this).css('MozUserSelect', 'none');
                } else if ($.browser.msie) {//IE
                    $(this).bind('selectstart', function () { return false; });
                } else {//Opera, etc.
                    $(this).mousedown(function () { return false; });
                }
            });
        });
        $('.noSelect').disableTextSelect(); //No text selection on elements with a class of 'noSelect'
    });



    /////




    RunPage();

    //filter output 
    if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
        $('.btn').hide();
    }
});

$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

function RunPage() {

    var startDate = new Date();
    var endDate = new Date();

    //collect URL parameters
    //If there is no startdate or enddate, set them to be the period since the last working day

    reportOnly = getUrlVars()["reportOnly"];

    //if there is a startdate in the query string, use it...
    if (getUrlVars()["startDate"]) {
        //change %20 to space and parse the date
        startDate = Date.parse(getUrlVars()["startDate"].replace('%20',' '));
    } else {
        //...if not, build one from the current date
        switch (true) {
            //monday
            case (Date.today().is().monday()):
                startDate = (3).days().ago();
                break;
            //sunday
            case (Date.today().is().sunday()):
                startDate = (2).days().ago();
                break;
            //rest of week
            default:
                startDate = (1).days().ago();
                break;
        }
        //set the time
        startDate.clearTime().addHours(17);
    }

    if (getUrlVars()["endDate"]) {
        //change %20 to space and parse the date
        endDate = Date.parse(getUrlVars()["endDate"].replace('%20', ' '));
    } else {
        endDate = Date.today().clearTime().addHours(9);
    }

    //build links for reporting
    var pageURL = [location.protocol, '//', location.host, location.pathname].join('');

    $('#permalink').attr("href", pageURL + "?startDate=" + startDate.toString('d/M/yyyy HH:mm') + "&endDate=" + endDate.toString('d/M/yyyy HH:mm') + "");
    $('#permalinkInvestigated').attr("href", pageURL + "?startDate=" + startDate.toString('d/M/yyyy HH:mm') + "&endDate=" + endDate.toString('d/M/yyyy HH:mm') + "&reportOnly=true");

    // Decide whether or not to hide all buttons (ie or report mode)
    var hideallbuttons = 0

    if (($.browser.msie && $.browser.version.substr(0, 1) < 7) || (reportOnly)) {
        hideallbuttons = 1;
    }

    //Set up the JSON which contains the environments to query

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
                    { "name": "Preprod", "VCServer": "preproddspp" },
                    { "name": "Live", "VCServer": "proddspp" }
                ]
            },
            {
                "Name": "Scottish Widows",
                "Environments": [
                    { "name": "Scottish Widows 1", "VCServer": "scotwid1" },
                    { "name": "Scottish Widows 2", "VCServer": "scotwid2" }
                ]
            }

        ]
        }





        // Populate everything
        //====================

        var output = $('#output');
        var menu = $('ul.dropdown-menu');

        $('#output').empty();
        //$('#output').append('<textarea style="width:95%;" rows="3" cols="1" name="text" id="SummaryTextArea" class="SummaryTextArea text ui-widget-content ui-corner-all">Enter today`s summary here...</textarea>');

        $.each(
        //For each reporting area
            ReportsToRequest.ReportingAreas,
            function (i, area) {

                //...write the area name
                output.append('<h2 class="shiftDown">' + area.Name + '</h2>');

                $.each(
                //for each environment in the reporting area
                    area.Environments,
                    function (i2, env2) {

                        menu.append('<li class=""><a href="#' + env2.VCServer + '">' + env2.VCServer + '</a></li>');

                        //start the section
                        var htmlRenderOutput = '<section id="sec_' + env2.VCServer + '">';

                        //write the name of the VC
                        htmlRenderOutput += '<h3>' + env2.name + ' [VC:' + env2.VCServer + ']</h3>';

                        if (!hideallbuttons) {

                            htmlRenderOutput +=

                            '<div class="buttonrow">' +
                            //show all and hide all buttons
                                '<div class="btn-group" style="float:left;">' +
                                    '<a id="Btn_showall_' + env2.VCServer + '"class="btn"><i class="icon-chevron-down"></i> All</a>' +
                                    '<a id="Btn_hideall_' + env2.VCServer + '"class="btn"><i class="icon-chevron-up"></i> All</a>' +
                                '</div> ' +
                                ' <a class="btn" id="Btn_anno_' + env2.VCServer + '">Annotate selected events</a>' +
                            '</div>';

                        }

                        //create the data area
                        htmlRenderOutput += '<div id="data_' + env2.VCServer + '"></div><div id="comments_' + env2.VCServer + '"> &nbsp </div>';

                        //close the section
                        htmlRenderOutput += '</section>';
                        output.append(htmlRenderOutput);

                        var dataID = "#data_" + env2.VCServer;
                        //render the table

                        GetPostsIntoTable(env2.VCServer, dataID, startDate, endDate, reportOnly);


                    }
                );
            }
        );
}







function GetPostsIntoTable(env,locID,start,end,hideAllButtons) {

    var dateStartDate = new Date(start);
    var dateEndDate = new Date(end);
    var LogRequest = {}

    //Set up the Log request data object
    //========================================================================
    //Add the start and end dates. Format the strings so that the server can understand them (no native data conversion occurs in the request data object)
   // LogRequest.startDate = start.toString();
    LogRequest.startDate = dateStartDate.format('M j Y H:i:s');

   // LogRequest.endDate = end.toString();
    LogRequest.endDate = dateEndDate.format('M j Y H:i:s');

    if (reportOnly == 0) {reportOnly = ""; }
    if (reportOnly == "false") {reportOnly = ""; }

    LogRequest.reportOnly = reportOnly;
    LogRequest.environment = env;

    var DTO = {'LogRequest' : LogRequest};

    var renderOutput = ""

    //Send the request
    //========================================================================
    $.ajax({
        type: "POST",
        url: "Service.asmx/GetEntries",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        //If the request is successful, parse the data
        //========================================================================
        success: function (response) {
            var location = $(locID);
            location.empty();

            var les = response.d;

            if (les.length != 0) {

                //Create the table header
                renderOutput = '<table id="' + env + '" class="width100percent display table-striped table-bordered table-condensed">'
                
                //location.html('<table id="' + env + '" class="width100percent display table-striped table-bordered table-condensed"></table>');

                //create the table heading row
                renderOutput += '<thead><tr>' +
                '   <td>InvestigationID</td>' +
                '  <td>Type</td>' +
                '  <td>EntryID</td>' +
                '   <td>Time</td>' +
                '   <td>Event</td>' +
                '   <td>#</td>' +
                '   <td>Host</td>' +
                '   <td>Cluster</td>' +
                '</tr></thead><tbody>';

                //render the data
                var typeIconString = "";
                var rowtag = "";
                var l = les.length;

                for (var i = 0; i < l; i++) {
                    rowTag = '<tr class="data">';
                    if (les[i].InvestigationID != 0) {
                        rowTag = '<tr class="data investigated inv_' + les[i].InvestigationID + '">';

                    } else {
                        rowTag = '<tr class="data unInvestigated inv_' + les[i].InvestigationID + '">';
                    }

                    if (les[i].Type === 1) { typeIconString = '<i class="icon-list-alt"></i>' }
                    else if (les[i].Type === 2) { typeIconString = '<i class="icon-warning-sign"></i>' }
                    else if (les[i].Type === 3) { typeIconString = '<i class="icon-adjust"></i>' }

                    renderOutput += rowTag +
                    '   <td>' + les[i].InvestigationID + '</td>' +
                    '   <td class="typeIcon">' + typeIconString + '</td>' +
                    '   <td class="cell_EntryID">' + les[i].EntryID + '</td>' +
                    '   <td class="timecol">' + les[i].Time + '</td>' +
                    '   <td>' + les[i].Event + '</td>' +
                    '   <td>' + les[i].Occurrences + '</td>' +
                    '   <td>' + les[i].Host + '</td>' +
                    '   <td>' + les[i].Cluster + '</td></tr>';

                }

                //close the table body
                renderOutput += "</tbody></table>";

                //alert(renderOutput);

                //write the data into the dom
                location.html(renderOutput);

                //connect the current table to the datatable plugin
                $('table#' + env).dataTable({
                    "bPaginate": false,
                    "bJQueryUI": true,
                    "bFilter": false,
                    "bInfo": false,
                    "bAutoWidth": false,
                    "bDestroy": true,


                    //this bit groups the rows according to the investigation id.
                    "fnDrawCallback": function (oSettings) {

                        if (oSettings.aiDisplay.length == 0) {
                            return;
                        }

                        var nTrs = $('table#' + env + ' tbody tr');
                        var iColspan = nTrs[0].getElementsByTagName('td').length;
                        var sLastGroup = "";
                        for (var i = 0; i < nTrs.length; i++) {
                            var iDisplayIndex = oSettings._iDisplayStart + i;
                            var sGroup = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[0]; // 0 for the first cell in the row, which is investigation id.

                            if (sGroup != sLastGroup) {

                                var InvestigationText = "";

                                if (sGroup == 0) {
                                    var nGroup = document.createElement('tr');
                                    var nCell = document.createElement('td');
                                    nCell.colSpan = iColspan;

                                    nCell.className = "groupUninvestigated";

                                    nCell.innerHTML += '<span class= id="inv_' + env + '_' + sGroup + '"></span> <em> Not Investigated</em>';
                                    nGroup.appendChild(nCell);
                                    nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);
                                    InvestigationText = "Not Yet Investigated";

                                } else {
                                    var nGroup = document.createElement('tr');
                                    var nCell = document.createElement('td');
                                    nCell.colSpan = iColspan;
                                    nCell.className = "group";

                                    nCell.innerHTML += '<span class=spinner id="inv_' + env + '_' + sGroup + '"></span> <em> Loading Investigation #' + sGroup + '</em>';
                                    nGroup.appendChild(nCell);
                                    nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);

                                    addSpinner("inv_" + env + "_" + sGroup);

                                    //Load the investigation details into the header row
                                    //====================================================================================================================
                                    var DTO = { "id": sGroup };
                                    $.ajax({
                                        async: false,
                                        type: "POST",
                                        url: "Service.asmx/GetInvestigation",
                                        data: JSON.stringify(DTO),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",

                                        // If the request is successful, parse and render the data 
                                        //====================================================================================================================
                                        success: function (response) {
                                            var invEntry = response.d;
                                            InvestigationText = invEntry.Text.replace(/\n/g, "<br/>");
                                        },

                                        failure: function (msg) {
                                            alert(msg);
                                        }

                                    });

                                }

                                //add the buttons to the row 
                                //====================================================================================================================
                                var investigationHeaderHTML = "";

                                investigationHeaderHTML = '<a class="btn rowhider rowhider_' + sGroup + '"  style="float:left;margin-right: 6px;"><i class="icon-chevron-up"></i></a>';

                                //if the hideallbuttons flag is preset, do not show the edit button.
                                //also, if these events have not yet been investigated, do not show the edit button, as there is nothing to edit.

                                if (sGroup != 0) {
                                    if (!hideAllButtons) {
                                        investigationHeaderHTML += '<a class="btn editbtn" id="edit_btn_' + sGroup + '"  style="float:left;margin-right: 6px; "><i class="icon-pencil"></i></a>'
                                    }
                                }
                                investigationHeaderHTML += '<div class="investigationHeaderText">' + InvestigationText + "</div>";

                                nCell.innerHTML = investigationHeaderHTML;

                                //iterate
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


                //add a click handler to the investigation text edit button
                //====================================================================================================================
                                    
                $(".editbtn").on('click',function () {
                    
                    var myregexp = /edit_btn_(\d+)/;
                    var myMatch = myregexp.exec($(this).attr('id'));
                    var id = myMatch[1];

                    $('table').removeClass('focusedTable');
                    $(this).closest('table').addClass('focusedTable');
                    var text = $(this).parent().children('div.investigationHeaderText').html();
                    $('#InvestigationText').html(text);
                    $('#InvestigationID').html(id.toString());
        
                    $('table').removeClass('focusedTable');
                    $("table#" + env).addClass('focusedTable');
                    $().initInvestigationForm(LogRequest);
                });

                //add a click handler to the button which hides and unhides the rows
                //====================================================================================================================                
                $('table#' + env + " .rowhider").on('click', function () {
                    //find the rowhider_ ID and use this to find the rows.
                    var classes = $(this).attr('class');
                    var myregexp = /rowhider_(\d+)/;
                    var myMatch = myregexp.exec(classes);
                    var id = myMatch[1];

                    var thisTable = $(this).closest('table').attr('id');

                    if ($(this).hasClass('rowshidden')) {
                        //show


                        $('table#' + thisTable + ' .inv_' + id).show();
                        $(this).html('<i class="icon-chevron-up"></i>');
                        $(this).removeClass('rowshidden');
                        $(this).parent().children('div.investigationHeaderText').removeClass('collapsed-text');
                    } else {
                        //hide
                        $('table#' + thisTable + ' .inv_' + id).hide();
                        $(this).html('<i class="icon-chevron-down"></i>');
                        $(this).addClass('rowshidden');
                        $(this).parent().children('div.investigationHeaderText').addClass('collapsed-text');
                    }
                });

                if (reportOnly) { $('table#' + env + " .rowhider").trigger('click'); }

                //add a click handler for the top button row
                //====================================================================================================================

                $('#Btn_hideall_' + env).click(function () {
                    $('table#' + env + ' a.rowhider').each(function () {
                        if (!($(this).hasClass('rowshidden'))) {
                            $(this).trigger('click');
                        }
                    });
                });

                //add a click handler which unhides all investigations
                $('#Btn_showall_' + env).click(function () {
                    $('table#' + env + ' a.rowhider').each(function () {
                        if ($(this).hasClass('rowshidden')) {
                            $(this).trigger('click');
                        }
                    });
                });

                //add handler to the button
                $('#Btn_anno_' + env).on('click', function () {
                    $('table').removeClass('focusedTable');
                    $("table#" + env).addClass('focusedTable');
                    $('#InvestigationID').html("-1");
                    $().initInvestigationForm(LogRequest);
                });


                //make rows selectable, and disable browser text selection
                //====================================================================================================================
                $('table#' + env + " tr").shiftClick();
                $('table#' + env + " td").disableTextSelect();

            } else {
                // If the request is successful, but no data comes back, hide the section.
                //====================================================================================================================
                //location.html();
                location.prev().append('<span> - No Data</span>');
                location.next().remove();
                location.remove();
            }
        },
        failure: function (msg) {
            location.text(msg);
            //return 0;
        }
    });
}



