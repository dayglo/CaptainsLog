using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.Services;
using System.Web.Services.Protocols;
using System.Web.Script.Services;

using System.Data;
using System.Data.SqlClient;

using System.Configuration;
using System.Diagnostics;

namespace CaptainsLog
{

    public class LogEntry
    {
        public long EntryID;
        public string Time;
        public string Event;
        public long Occurrences;
        public string Host;
        public string Cluster;
        public int ServerID;
        public long InvestigationID;
        public string Environment;

    }

    public class LogRequest
    {
        public string startDate;
        public string endDate;
        public string environment;
    }


    public class InvestigationEntry
    {
        public long InvestigationID;
        public string Text;
        public string SupportRef;
        public bool Complete;
        public bool KnownError;
        public List<int> EntryIDs;
    }

/// <summary>
    /// Summary description for JobPost1ws
    /// </summary>
    [WebService(Namespace = "http://10.225.124.52/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
    [System.Web.Script.Services.ScriptService]
    public class CaptainsLog1ws : System.Web.Services.WebService
       {

        [WebMethod]
        public List<LogEntry> GetEntries(LogRequest LogRequest)
        //string environment, string cluster, string server, string starttime, string endtime
        {
            using (SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["Live"].ConnectionString))
            {
                string SQL = "SELECT [Time], [Event],[Occurrences],  [Host], [Cluster],[ServerID],[EntryID],[investigationID],[Environment] FROM [EntryView] " +
                "WHERE ([Environment] = @environment) " +
                "AND (Time BETWEEN @startDate AND @endDate) " +
                "ORDER BY investigationID,Time ";

                SqlCommand myCommand = new SqlCommand(SQL, myConnection);
                
                myCommand.Parameters.AddWithValue("@environment",LogRequest.environment);
                myCommand.Parameters.AddWithValue("@startDate", LogRequest.startDate);
                myCommand.Parameters.AddWithValue("@endDate", LogRequest.endDate);

                myConnection.Open();
                myCommand.ExecuteNonQuery();
                myConnection.Close();

                SqlDataAdapter dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = myCommand;

                DataSet DSet = new DataSet();
                dataAdapter.Fill(DSet);

                List<LogEntry> logentries = new List<LogEntry>();
                foreach (DataRow row in DSet.Tables[0].Rows)
                {
                    LogEntry le = new LogEntry();
                    le.EntryID = (long)row["EntryID"];

                    if (!(row["InvestigationID"] == System.DBNull.Value))
                    {
                        le.InvestigationID = (long)row["InvestigationID"];
                    }
                    else
                    {
                        le.InvestigationID = 0;
                    }

                    le.EntryID = (long)row["entryID"];
                    le.Time = row["Time"].ToString();
                    le.Occurrences = (long)row["Occurrences"];
                    le.ServerID = (int)row["ServerID"];

                    le.Host = row["Host"].ToString();
                    le.Event = row["Event"].ToString();
                    le.Environment = row["Environment"].ToString();
                    le.Cluster = row["Cluster"].ToString();

                    //jp.Time = (DateTime)row["Time"].ToString();

                    logentries.Add(le);
                }


                return logentries;
            
            }
        }


        [WebMethod]
        public InvestigationEntry GetInvestigation(int id)
        {
            using (SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["Live"].ConnectionString))
            {
                //string SQL = "SELECT [Time], [Event],[Occurrences],  [Host], [Cluster],[ServerID],[EntryID],[investigationID],[Environment] FROM [EntryView] " +
                //"WHERE ([Environment] = '" + LogRequest.environment + "') " +
                //"AND (Time BETWEEN '" + LogRequest.startDate + "' AND '" + LogRequest.endDate + "') " +
                //"ORDER BY investigationID,Time ";

                string SQL = "SELECT [investigationID], [Text], [SupportRef], [Complete],[KnownError] " +
                             "FROM [captains_log].[dbo].[Investigations] " +
                             "WHERE investigationID = @id";

                SqlCommand myCommand = new SqlCommand(SQL, myConnection);
                myCommand.Parameters.AddWithValue("@id", id);
                myConnection.Open();
                myCommand.ExecuteNonQuery();
                myConnection.Close();

                SqlDataAdapter dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = myCommand;

                DataSet DSet = new DataSet();
                dataAdapter.Fill(DSet);

                //get the first row from the first table;

                InvestigationEntry entry = new InvestigationEntry();
                entry.InvestigationID = (long)DSet.Tables[0].Rows[0]["investigationID"];
                entry.Text = DSet.Tables[0].Rows[0]["Text"].ToString();
                entry.SupportRef = DSet.Tables[0].Rows[0]["SupportRef"].ToString();
                entry.Complete = (bool)DSet.Tables[0].Rows[0]["Complete"];
                entry.KnownError = (bool)DSet.Tables[0].Rows[0]["KnownError"];

                return entry;

            }
        }

        [WebMethod]
        public void NewInvestigation(InvestigationEntry InvestigationEntry)
        {
            using (SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["Live"].ConnectionString))
            {

                string SQL = "";
                if (InvestigationEntry.InvestigationID == -1)
                {

                    SQL =   "BEGIN TRANSACTION UpdateEntriesAndInvestigations " +
                            "INSERT INTO [captains_log].[dbo].[Investigations] ([Text], [SupportRef], [Complete],[KnownError]) " +
                            "VALUES( @Text, @SupportRef, @Complete, @KnownError) " +

                            "UPDATE [captains_log].[dbo].[entries] " +
                            "SET investigationID = @@IDENTITY " +
                            "WHERE entryID IN (@entryIDs) " +
                            "COMMIT TRANSACTION UpdateEntriesAndInvestigations";
                }
                else
                {
                    SQL =   "BEGIN TRANSACTION UpdateEntriesAndInvestigations " +
                            "UPDATE [captains_log].[dbo].[Investigations] " +
                            "SET Text = @Text " +
                            "WHERE investigationID = @invID " +
                            "COMMIT TRANSACTION UpdateEntriesAndInvestigations";
                }
                
                SqlCommand myCommand = new SqlCommand(SQL, myConnection);
                myCommand.Parameters.AddWithValue("@Text", InvestigationEntry.Text);
                myCommand.Parameters.AddWithValue("@SupportRef", InvestigationEntry.SupportRef);
                myCommand.Parameters.AddWithValue("@Complete", InvestigationEntry.Complete);
                myCommand.Parameters.AddWithValue("@KnownError", InvestigationEntry.KnownError);
                myCommand.Parameters.AddWithValue("@invID", InvestigationEntry.InvestigationID);
                myCommand.CommandText = myCommand.CommandText.Replace(
                    "@entryIDs",
                    String.Join(",",InvestigationEntry.EntryIDs.Select(b => b.ToString()))
                );

                myConnection.Open();
                myCommand.ExecuteNonQuery();
                myConnection.Close();


            }
        }

    }
}