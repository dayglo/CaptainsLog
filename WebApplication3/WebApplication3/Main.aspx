<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="WebApplication3.WebForm1" EnableViewState="false" EnableSessionState="ReadOnly"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <!--<link href="css/reset.css" rel="stylesheet" type="text/css" />-->
    
    <link href="css/CaptainsLog.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />




</head>
<body>
    <div class="navbar navbar-fixed-top">
        <a class="brand" href="#" style="margin-left:1px;"><img alt="d" src="img/captains_log_icon.png" height="28" width="28" /><span style="position:relative; bottom:7px;margin-left:10px; padding-right:17px;">Captain's Log</span></a>
         <div class="navbar-inner">

                <ul class="nav">
                <li class="active">
                <a href="#">VMware Health</a>
                </li>
                <!--<li><a href="#">Hardware</a></li>
                <li><a href="#">Next</a></li>-->
                </ul>

         </div>
    </div>



    <div class="container-fluid" style="padding-top:50px;">

        <form id="form2" runat="server">

            <!--<input type="button" id="Button1" value="Get Entries"/>
            <asp:Label ID="UserName" runat="server" Text="username"></asp:Label> &nbsp; -->
             <header id="overview" class="jumbotron subhead">
                <h1>VMware Health Check</h1>
                <p class="lead">A live view of all events triggered on the LBG VMware platforms.</p>
              </header>

             <div class="subnav">
                <ul class="nav nav-pills">
                    <li class="dropdown active">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Environments<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                          
                        </ul>
                      </li>
                      <li><a id="permalink" >Permalink to this page</a></li>
                      <li><a id="permalinkInvestigated">Today`s Report Link (Investigated items only)</a></li>
                </ul>
             </div>
            <div id="output"></div>
        </form>

    </div>
    
    <div style='display:none'>
    <div id="dialog-form" title="Add Investigation Details">
        <div class='inv-content' style="height:280px;">
        <h1 class='inv-title'>Enter your notes regarding the selected log events</h1>

	
            <form action='#' style='display:none'>
                
                <div id="InvestigationID" style='display:none'>-1</div>
		        <label for="text">Text</label>
                <textarea rows="9" cols="1" name="text" id="InvestigationText" class="investigationTextArea text ui-widget-content ui-corner-all"></textarea>
                <a class="btn" id="saveInv">Save</a>
                <a class="btn" id="cancelInv">Cancel</a>
            </form>
        </div>
    </div>

</div>
    

</body>

    <script src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="js/jquery.blockUI.js" type="text/javascript"></script>    
    <script src="js/bootstrap.js" type="text/javascript"></script>
    <script src="js/json2.js" type="text/javascript"></script>
  
    <script type="text/javascript" charset="utf-8" src="/DataTables/media/js/jquery.dataTables.js"></script>
       <script src="js/jquery.simplemodal-1.4.2.js" type="text/javascript"></script>
    <script src="js/spin.min.js" type="text/javascript"></script>
    <script src="js/date-en-GB.js" type="text/javascript"></script>
     <script type="text/javascript" src="js/Default.js"> </script>

</html>