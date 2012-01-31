<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="WebApplication3.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <!--<link href="css/reset.css" rel="stylesheet" type="text/css" />-->
    <link href="css/smoothness/jquery.ui.all.css" rel="stylesheet" type="text/css" />
    <link href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" type="text/css" />
      <style type="text/css" title="currentStyle">
        @import "/DataTables/media/css/demo_table_jui.css";
    </style>
    <link href="DataTables/media/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="DataTables/media/css/jquery.dataTables_themeroller.css" rel="stylesheet"
        type="text/css" />
    <script src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="js/json2.js" type="text/javascript"></script>


    <script type="text/javascript" charset="utf-8" src="/DataTables/media/js/jquery.dataTables.js"></script>
    



    <script type="text/javascript" src="js/Default.js"> </script>
</head>
<body>
     <form id="form2" runat="server">
 
    <input type="button" id="Button1" value="Get Entries"/>
 
    <div id="output"></div>
 
    </form>

</body>
</html>