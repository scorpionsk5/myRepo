using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestApiProxy.Models;

namespace RestApiProxy.Controllers
{
    public class GetCustomizedAppsController : ApiController
    {
        // GET: api/GetCustomizedApps
        public object Get()
        {
            GetCustomApps CustomApps = new GetCustomApps();
            return CustomApps.GetData();
        }

        // GET: api/GetCustomizedApps/5
        public string Get(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/GetCustomizedApps
        public object Post([FromBody]object value)
        {
            GetCustomApps CustomApps = new GetCustomApps();
            return CustomApps.GetData();
        }

        // PUT: api/GetCustomizedApps/5
        public void Put(int id, [FromBody]string value)
        {
            throw new NotImplementedException();
        }

        // DELETE: api/GetCustomizedApps/5
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
