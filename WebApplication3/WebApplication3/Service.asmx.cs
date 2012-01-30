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
                "WHERE ([Environment] = '"+ LogRequest.environment + "') " +
                "AND (Time BETWEEN '" + LogRequest.startDate + "' AND '" + LogRequest.endDate + "') " +
                "ORDER BY investigationID,Time ";

                SqlCommand myCommand = new SqlCommand(SQL, myConnection);
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
    }
}