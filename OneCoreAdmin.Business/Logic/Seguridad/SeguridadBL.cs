using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OneCoreAdmin.Data;
using OneCoreAdmin.Data.Seguridad;
using OneCoreAdmin.Business.Entities;
using OneCoreAdmin.Framework.Logging;
using OneCoreAdmin.Framework.Crypto;

namespace OneCoreAdmin.Business.Logic.Seguridad
{
    /// <summary>
    /// Clase que administra la administración de usuarios a nivel negocio.
    /// </summary>
    public class SeguridadBL
    {
        #region "Metodos Publicos"

        /// <summary>
        /// Método que nos permite autenticar al usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Usuario proporcionado</param>
        /// <param name="contrasena">Contraseña proporcionada</param>
        /// <returns>True en el caso de credenciales sean correctas</returns>
        public static async Task<bool> AutenticarUsuario(string usuario, string contrasena)
        {
            Usuarios user = null;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    user = await _repo.LoginUsuarioAsync(usuario, Encrypting.Encrypt(contrasena));

                    if (user == null)
                    {
                        return false;
                    }

                    Loggers.WriteInfo(string.Format("SeguridadBL.AutenticarUsuario: Se autentico el usuario {0} de forma exitosa", usuario));

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite obtener la lista de usuarios del sistema excepto el administrdor.
        /// </summary>
        /// <returns>Lista de objetos de tipo usuario</returns>
        public static async Task<List<UsuariosDTO>> ObtenerUsuarios()
        {
            List<UsuariosDTO> usuarios = new List<UsuariosDTO>();

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    List<Usuarios> listaUsuarios = await _repo.GetUsersAllAsync();

                    foreach (Usuarios u in listaUsuarios)
                    {
                        usuarios.Add(
                                new UsuariosDTO()
                                {
                                    idUsuario = u.idUsuario,
                                    usuario = u.usuario,
                                    contrasena = u.contrasena,
                                    estatus = u.estatus,
                                    sexo = u.sexo,
                                    correo = u.correo,
                                    fechaCreacion = u.fechaCreacion,
                                    estatusDescripcion = u.estatus == true ? "Activo" : "Inactivo",
                                    sexoDescripcion = u.sexo == true ? "Masculino" : "Femenino"
                                }
                            );
                    }
                }

                return usuarios;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite registrar un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="usuarioNew">Objeto tipo usuario a registrar</param>
        /// <returns>Id del usuario registrado</returns>
        public static async Task<int> RegistrarUsuario(UsuariosDTO usuarioNew)
        {
            Usuarios user = null;
            int result = 0;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    user = new Usuarios()
                    {
                        usuario = usuarioNew.usuario,
                        contrasena = Encrypting.Encrypt(usuarioNew.contrasena),
                        estatus = usuarioNew.estatus,
                        sexo = usuarioNew.sexo,
                        correo = usuarioNew.correo,
                        fechaCreacion = DateTime.Now
                    };

                    result = await _repo.AddUserAsync(user);

                    Loggers.WriteInfo(string.Format("SeguridadBL.RegistrarUsuario: Se registro el usuario {0} de forma exitosa", usuarioNew.usuario));

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite actualizar la información de un usuario en particular.
        /// </summary>
        /// <param name="usuarioUpdate">Objeto tipo usuario por actualizar</param>
        /// <returns>Número de registros actualizados</returns>
        public static async Task<int> ActualizarUsuario(UsuariosDTO usuarioUpdate)
        {
            Usuarios user = null;
            int result = 0;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    user = new Usuarios()
                    {
                        idUsuario = usuarioUpdate.idUsuario,
                        usuario = usuarioUpdate.usuario,
                        contrasena = Encrypting.Encrypt(usuarioUpdate.contrasena),
                        estatus = usuarioUpdate.estatus,
                        sexo = usuarioUpdate.sexo,
                        correo = usuarioUpdate.correo
                    };

                    result = await _repo.UpdateUserAsync(user);

                    Loggers.WriteInfo(string.Format("SeguridadBL.RegistrarUsuario: Se actualizo el usuario {0} de forma exitosa", usuarioUpdate.usuario));

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite dar de baja lógica a un usuario en particular.
        /// </summary>
        /// <param name="idUsuario">Clave del usuario que se desea dar de baja lógica</param>
        /// <returns>Regresa 1 en caso de dar de baja logica de forma exitosa</returns>
        public static async Task<int> EliminarUsuario(int idUsuario)
        {
            Usuarios user = null;
            int result = 0;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    user = new Usuarios()
                    {
                        idUsuario = idUsuario,
                        estatus = false
                    };

                    result = await _repo.DeleteUserAsync(user);

                    Loggers.WriteInfo(string.Format("SeguridadBL.RegistrarUsuario: Se elimino el usuario con el id {0} de forma exitosa", idUsuario));

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite validar si existe un usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Nombre del usuario por buscar</param>
        /// <returns>True en caso de existir</returns>
        public static async Task<bool> ExisteUsuario(string usuario)
        {
            bool result = false;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    result = await _repo.ExistUserAsync(usuario);

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion "Metodos Publicos"
    }
}