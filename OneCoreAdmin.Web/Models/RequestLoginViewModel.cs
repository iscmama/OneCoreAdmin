using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace OneCoreAdmin.Web.Models
{
    public class RequestLoginViewModel
    {
        public string usuario { get; set; }
        public string contrasena { get; set; }
    }
}