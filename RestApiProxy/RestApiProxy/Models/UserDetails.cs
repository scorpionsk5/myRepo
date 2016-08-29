using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApiProxy.Models
{
    public class UserDetails
    {
        private string UN = "QUADWAVE\\shashi.k";
        private string FN = "Shashi Kumar D";
        public string UserName { get { return UN; } }
        public string FullName { get { return FN; } }
    }
}