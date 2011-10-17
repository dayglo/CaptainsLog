using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication3
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string v = Request.QueryString["startdate"];
            if (v == null)
            {
                // Get 5PM on the last weekday
                DateTime StartDate;
                switch (DateTime.Today.DayOfWeek) {
                    case DayOfWeek.Monday:
                        StartDate = DateTime.Now.Date.AddHours(-72 + 17);
                        break;
                    case DayOfWeek.Sunday:
                        StartDate = DateTime.Now.Date.AddHours(-48 + 17);
                        break;
                    default:
                        StartDate = DateTime.Now.Date.AddHours(-24 + 17);
                        break;
                }

                Response.Redirect("/?startdate=" + StartDate.ToString());
             
            }
        }
    }
}