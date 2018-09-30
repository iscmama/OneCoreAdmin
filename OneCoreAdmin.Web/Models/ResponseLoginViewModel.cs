using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace OneCoreAdmin.Web.Models
{
    public class ResponseLoginViewModel
    {
        public bool autenticado { get; set; }
        public string mensaje { get; set; }
        public string usuario { get; set; }
    }
}