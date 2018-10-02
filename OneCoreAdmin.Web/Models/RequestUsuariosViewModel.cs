using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OneCoreAdmin.Web.Models
{
    public class RequestUsuariosViewModel
    {
        public int idUsuario { get; set; }
        public string usuario { get; set; }
        public string contrasena { get; set; }
        public bool estatus { get; set; }
        public bool sexo { get; set; }
        public string correo { get; set; }
    }
}