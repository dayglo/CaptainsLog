<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="WebApplication3.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <!--<link href="css/reset.css" rel="stylesheet" type="text/css" />-->
    
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="css/smoothness/jquery.ui.all.css" rel="stylesheet" type="text/css" />
    <link href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" type="text/css" />


    <link href="css/CaptainsLog.css" rel="stylesheet" type="text/css" />
    
    <script src="js/bootstrap.js" type="text/javascript"></script>
    <script src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="js/json2.js" type="text/javascript"></script>
    <script src="js/jquery-ui-1.8.17.custom.min.js" type="text/javascript"></script>
    <script type="text/javascript" charset="utf-8" src="/DataTables/media/js/jquery.dataTables.js"></script>
    <script src="js/spin.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/Default.js"> </script>
</head>
<body>
     <form id="form2" runat="server">
 
    <input type="button" id="Button1" value="Get Entries"/>
 
    <div id="output"></div>
 
    </form>


    <div id="dialog-form" title="Add Investigation Details">
	    <p class="validateTips">Enter your notes regarding the selected log events</p>

	    <form id="invForm">
	    <fieldset>
		    <label for="text">Text</label>
		    
            
            <textarea name="text" id="InvestigationText" class="investigationTextArea text ui-widget-content ui-corner-all">test</textarea>
		    <!--<label for="KnownError">Known Error</label>
		    <input type="text" name="KnownError" id="KnownError" value="" class="text ui-widget-content ui-corner-all" />-->
	    </fieldset>
	    </form>
    </div>


</body>
</html>