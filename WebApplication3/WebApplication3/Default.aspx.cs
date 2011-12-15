using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

using System.Diagnostics;

namespace WebApplication3
{

    public partial class _Default : Page
    {
        [WebMethod]
        public static string GetDate()
        {
            return DateTime.Now.ToString();
        }
    }
}