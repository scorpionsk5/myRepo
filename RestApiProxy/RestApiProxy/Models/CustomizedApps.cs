using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApiProxy.Models
{
    public class CustomizedApps : IEnumerable<CustomizedAppsModel>
    {
        private List<CustomizedAppsModel> list = new List<CustomizedAppsModel>();

        public IEnumerator<CustomizedAppsModel> GetEnumerator()
        {
            return list.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public void AddItem(string AN, string Des, string CD, string PD, string St, string ID)
        {
            CustomizedAppsModel item = new CustomizedAppsModel();
            item.AppName = AN;
            item.CreatedDate = CD;
            item.Description = Des;
            item.IconData = ID;
            item.PublishedDate = PD;
            item.Status = St;

            list.Add(item);
        }
    }
}