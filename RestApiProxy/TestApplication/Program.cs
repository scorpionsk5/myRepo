using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestApiProxy.Models;

namespace TestApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            GetCustomApps ga = new GetCustomApps();
            CustomizedApps j = ga.GetData();
            Console.Write(j);
        }
    }
}
