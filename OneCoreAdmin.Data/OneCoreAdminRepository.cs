using OneCoreAdmin.Data.Seguridad;
using OneCoreAdmin.Framework.Logging;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace OneCoreAdmin.Data
{
    /// <summary>
    /// Clase que nos permite administrar los métodos implementados para la tabla usuarios.
    /// </summary>
    public class OneCoreAdminRepository : IDisposable
    {
        #region "Atributos"

        /// <summary>
        /// Se instancia el contexto para la base de datos.
        /// </summary>
        private OneCoreAdminContext _context;

        #endregion "Atributos"

        #region "Constructores"

        /// <summary>
        /// Constructor de la clase.
        /// </summary>
        public OneCoreAdminRepository()
        {
            _context = new OneCoreAdminContext();
        }

        #endregion "Constructores"

        #region "Metodos"

        /// <summary>
        /// Método que nos permite autenticar al usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Usuario proporcionado</param>
        /// <param name="contrasena">Contraseña proporcionada</param>
        /// <returns>True en el caso de credenciales sean correctas</returns>
        public async Task<Usuarios> LoginUsuarioAsync(string usuario, string contrasena)
        {
            try
            {
                return await (from u in _context.Usuarios
                              where (u.usuario.ToLower() == usuario.ToLower()) && (u.contrasena == contrasena) && (u.estatus == true)
                              select u).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.LoginUsuarioAsync: " + ex.Message, ex);
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite obtener la lista de usuarios del sistema excepto el administrdor.
        /// </summary>
        /// <returns>Lista de objetos de tipo usuario</returns>
        public async Task<List<Usuarios>> GetUsersAllAsync()
        {
            try
            {
                return await (from u in _context.Usuarios
                              orderby u.fechaCreacion descending
                              select u).ToListAsync<Usuarios>();
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.GetUsersAllAsync: " + ex.Message, ex);
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite registrar un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="usuarioNew">Objeto tipo usuario a registrar</param>
        /// <returns>Id del usuario registrado</returns>
        public async Task<int> AddUserAsync(Usuarios newUsuario)
        {
            try
            {
                var usuario = _context.Usuarios.Add(newUsuario);
                int result = await _context.SaveChangesAsync();
                return usuario.idUsuario;
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.AddUserAsync: " + ex.Message, ex);
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite actualizar la información de un usuario en particular.
        /// </summary>
        /// <param name="usuarioUpdate">Objeto tipo usuario por actualizar</param>
        /// <returns>Número de registros actualizados</returns>
        public async Task<int> UpdateUserAsync(Usuarios updateUsuario)
        {
            try
            {
                var usuario = await _context.Usuarios.SingleAsync(u => u.idUsuario == updateUsuario.idUsuario);

                if (usuario != null)
                {
                    updateUsuario.fechaCreacion = usuario.fechaCreacion;
                    _context.Entry<Usuarios>(usuario).CurrentValues.SetValues(updateUsuario);
                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.UpdateUserAsync: " + ex.Message, ex);
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite dar de baja lógica a un usuario en particular.
        /// </summary>
        /// <param name="idUsuario">Clave del usuario que se desea dar de baja lógica</param>
        /// <returns>Regresa 1 en caso de dar de baja logica de forma exitosa</returns>
        public async Task<bool> ExistUserAsync(string usuario)
        {
            try
            {
                var usuarioExiste = await _context.Usuarios.FirstOrDefaultAsync(u => u.usuario == usuario);

                if (usuarioExiste != null)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.ExistUserAsync: " + ex.Message, ex);
                throw ex;
            }
        }
        /// <summary>
        /// Método que nos permite validar si existe un usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Nombre del usuario por buscar</param>
        /// <returns>True en caso de existir</returns>
        public async Task<int> DeleteUserAsync(Usuarios deleteUsuario)
        {
            try
            {
                var usuario = await _context.Usuarios.SingleAsync(u => u.idUsuario == deleteUsuario.idUsuario);

                if (usuario != null)
                {
                    deleteUsuario.usuario = usuario.usuario;
                    deleteUsuario.contrasena = usuario.contrasena;
                    deleteUsuario.sexo = usuario.sexo;
                    deleteUsuario.correo = usuario.correo;
                    deleteUsuario.fechaCreacion = usuario.fechaCreacion;

                    _context.Entry<Usuarios>(usuario).CurrentValues.SetValues(deleteUsuario);
                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception ex)
            {
                Loggers.WriteError("Error en OneCoreAdminRepository.DeleteUserAsync: " + ex.Message, ex);
                throw ex;
            }
        }

        #endregion "Metodos"

        #region "Disposable"

        /// <summary>
        /// Método que nos permite la liberación de recursos.
        /// </summary>
        public void Dispose()
        {
            _context.Dispose();
        }
        
        #endregion "Disposable"
    }
}