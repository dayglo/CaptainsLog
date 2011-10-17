<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication3._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Captain's Log - VMware events since 5PM on the last working day.</title>
    <link href="StyleSheet1.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .style1
        {
            font-size: xx-small;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <h1>
        VMware Health Check <span class="style1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></h1>
    <h2>
        Heritage HBOS</h2>
    <h3>
    Infra</h3>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" 
        SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
        <SelectParameters>
            <asp:Parameter DefaultValue="infrp0101" Name="Environment" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                Name="StartDate" QueryStringField="startdate" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                Name="EndDate" QueryStringField="enddate" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource1" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical" style="margin-right: 0px">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" 
                SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />



    </asp:GridView>
    <h3>
        PreProd</h3>
    <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
        ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
        <SelectParameters>
            <asp:Parameter DefaultValue="infrp0100" Name="Environment" Type="String" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                Name="StartDate" QueryStringField="startdate" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                Name="EndDate" QueryStringField="enddate" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource2" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Prod</h3>
    <asp:SqlDataSource ID="SqlDataSource3" runat="server" 
        ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
        <SelectParameters>
            <asp:Parameter DefaultValue="infrl0100" Name="Environment" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                Name="StartDate" QueryStringField="startdate" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                Name="EndDate" QueryStringField="enddate" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:GridView ID="GridView3" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource3" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Drac Logs</h3>
    Clear<h2>
        Distributed Platform Readiness (DPR)</h2>
    <h3>
        Datastore Search</h3>
    Clear<h3>
        PreProd - PB2<asp:SqlDataSource ID="SqlDataSource4" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="preprodpb2" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView4" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource4" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        PreProd - PB3</h3>
    <asp:SqlDataSource ID="SqlDataSource5" runat="server" 
        ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
        <SelectParameters>
            <asp:Parameter DefaultValue="preprodpb3" Name="Environment" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                Name="StartDate" QueryStringField="startdate" />
            <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                Name="EndDate" QueryStringField="enddate" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:GridView ID="GridView5" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource5" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB2<asp:SqlDataSource ID="SqlDataSource6" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences],  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodpb2" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="2/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView6" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource6" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="Occurrences" HeaderText="#" 
                SortExpression="Occurrences" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB3<asp:SqlDataSource ID="SqlDataSource7" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodpb3" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView7" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource7" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h2>
        Strategic Development Infrastructure (SDI)</h2>
    <h3>
        PreProd<asp:SqlDataSource ID="SqlDataSource8" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="preprodsdipb2" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView8" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource8" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB2 #1<asp:SqlDataSource ID="SqlDataSource9" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodsdipb2_1" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView9" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource9" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB2 #2<asp:SqlDataSource ID="SqlDataSource10" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodsdipb2_2" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView10" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource10" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB3#1<asp:SqlDataSource ID="SqlDataSource11" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodsdipb3_1" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView11" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource11" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live - PB3 #2<asp:SqlDataSource ID="SqlDataSource12" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="prodsdipb3_2" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView12" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource12" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h2>
        Distributed Services Pre-Provisioning (DSPP)</h2>
    <h3>
        Preprod<asp:SqlDataSource ID="SqlDataSource13" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="preproddspp" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView13" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource13" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h3>
        Live<asp:SqlDataSource ID="SqlDataSource14" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="proddspp" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
    </h3>
    <asp:GridView ID="GridView14" runat="server" AutoGenerateColumns="False" 
        BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
        CellPadding="4" DataSourceID="SqlDataSource14" EnableModelValidation="True" 
        ForeColor="Black" GridLines="Vertical">
        <AlternatingRowStyle BackColor="White" />
        <Columns>
            <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
            <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
            <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
            <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
            <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                SortExpression="Cluster" />
        </Columns>
        <FooterStyle BackColor="#CCCC99" />
        <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
        <RowStyle BackColor="#F7F7DE" />
        <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
    </asp:GridView>
    <h2>
        Critical Business Testing (CBT)</h2>
    <p>
        <asp:SqlDataSource ID="SqlDataSource15" runat="server" 
            ConnectionString="<%$ ConnectionStrings:captains_logConnectionString6 %>" SelectCommand="SELECT [Time], [Event],[Occurrences] as '#',  [Host], [Cluster] FROM [EntryView] 
WHERE ([Environment] = @Environment)
     AND (Time BETWEEN @StartDate AND @EndDate)

ORDER BY Time">
            <SelectParameters>
                <asp:Parameter DefaultValue="e2eassurance" Name="Environment" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2011" 
                    Name="StartDate" QueryStringField="startdate" />
                <asp:QueryStringParameter DbType="DateTime" DefaultValue="1/1/2100" 
                    Name="EndDate" QueryStringField="enddate" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:GridView ID="GridView15" runat="server" AutoGenerateColumns="False" 
            BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" 
            CellPadding="4" DataSourceID="SqlDataSource15" EnableModelValidation="True" 
            ForeColor="Black" GridLines="Vertical">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:BoundField DataField="Time" HeaderText="Time" SortExpression="Time" />
                <asp:BoundField DataField="Event" HeaderText="Event" SortExpression="Event" />
                <asp:BoundField DataField="#" HeaderText="#" SortExpression="#" />
                <asp:BoundField DataField="Host" HeaderText="Host" SortExpression="Host" />
                <asp:BoundField DataField="Cluster" HeaderText="Cluster" 
                    SortExpression="Cluster" />
            </Columns>
            <FooterStyle BackColor="#CCCC99" />
            <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
            <RowStyle BackColor="#F7F7DE" />
            <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
        </asp:GridView>
    </p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <br />
    <br />
    <br />
    </form>
</body>
</html>
