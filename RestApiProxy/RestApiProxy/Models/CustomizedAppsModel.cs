using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApiProxy.Models
{
    public class CustomizedAppsModel
    {
        private string AN, Des, CD, PD, St, ID;
        public string AppName { get { return AN; } set { AN = value; } }
        public string Description { get { return Des; } set { Des = value; } }
        public string CreatedDate { get { return CD; } set { CD = value; } }
        public string PublishedDate { get { return PD; } set { PD = value; } }
        public string Status { get { return St; } set { St = value; } }
        public string IconData { get { return ID; } set { ID = value; } }
    }
}