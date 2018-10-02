using OneCoreAdmin.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OneCoreAdmin.Web.Models
{
    public class ResponseUsuariosViewModel
    {
        public string mensaje { get; set; }
        public List<UsuariosDTO> listaUsuarios { get; set; }
    }
}