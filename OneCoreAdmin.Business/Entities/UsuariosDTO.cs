using System;

namespace OneCoreAdmin.Business.Entities
{
    /// <summary>
    /// Clase que nos permite obtener y proporcionar información del usuario.
    /// </summary>
    public class UsuariosDTO
    {
        /// <summary>
        /// Propiedad que nos permite obtener la clave del usuario
        /// </summary>
        public int idUsuario { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener el usuario
        /// </summary>
        public string usuario { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener la contraseña del usuario
        /// </summary>
        public string contrasena { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener el estatus del usuario
        /// </summary>
        public bool estatus { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener el sexo del usuario
        /// </summary>
        public bool sexo { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener el correo del usuario
        /// </summary>
        public string correo { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener el fecha de creación del usuario
        /// </summary>
        public DateTime fechaCreacion { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener la descripción del estatus del usuario
        /// </summary>
        public string estatusDescripcion { get; set; }
        /// <summary>
        /// Propiedad que nos permite obtener la descripción del sexo del usuario
        /// </summary>
        public string sexoDescripcion { get; set; }
    }
}