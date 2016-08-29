using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestApiProxy.Models;

namespace RestApiProxy.Controllers
{
    public class GetRegisterUserController : ApiController
    {
        // GET: api/GetRegisterUser
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GetRegisterUser/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AgilePointLoginProxy
        public Object Post([FromBody]object value)
        {
            return new UserDetails();
        }

        // PUT: api/GetRegisterUser/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GetRegisterUser/5
        public void Delete(int id)
        {
        }
    }
}
