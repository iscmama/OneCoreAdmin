using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OneCoreAdmin.Data.Seguridad
{
    [Table("Usuarios")]
    public class Usuarios
    {
        [Key]
        public int idUsuario { get; set; }
        public string usuario { get; set; }
        public string contrasena { get; set; }
        public bool estatus { get; set; }
        public bool sexo { get; set; }
        public string correo { get; set; }
        public DateTime fechaCreacion { get; set; }
    }
}