using OneCoreAdmin.Business.Entities;
using OneCoreAdmin.Business.Logic.Seguridad;
using OneCoreAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace OneCoreAdmin.Web.Controllers
{
    /// <summary>
    /// Clase API para exponer los métodos para la administración de usuarios.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/Security")]
    public class SecurityController : ApiController
    {
        #region "Constantes"

        private const string MENSAJE_EXITO = "success";
        private const string MENSAJE_FALLO = "failed";
        private const string MENSAJE_SI_EXISTE = "exist";
        private const string MENSAJE_NO_ENCONTRADO = "notfound";

        #endregion "Constantes"

        #region "Metodos"

        [Route("Autenticar")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Autenticar(RequestLoginViewModel requestLogin)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = await SeguridadBL.AutenticarUsuario(requestLogin.usuario, requestLogin.contrasena);

                ResponseLoginViewModel response = new ResponseLoginViewModel()
                {
                    autenticado = result,
                    mensaje = result == true ? MENSAJE_EXITO : MENSAJE_FALLO,
                    usuario = requestLogin.usuario
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("ObtenerUsuarios")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ObtenerUsuarios()
        {
            try
            {
                List<UsuariosDTO> listaUsuarios = await SeguridadBL.ObtenerUsuarios();

                ResponseUsuariosViewModel response = new ResponseUsuariosViewModel()
                {
                    mensaje = listaUsuarios.Count > 0 ? MENSAJE_EXITO : MENSAJE_FALLO,
                    listaUsuarios = listaUsuarios
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("Registrar")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Registrar(RequestUsuariosViewModel requestRegistrar)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                UsuariosDTO usuarioNew = new UsuariosDTO()
                {
                    usuario = requestRegistrar.usuario,
                    contrasena = requestRegistrar.contrasena,
                    estatus = requestRegistrar.estatus,
                    sexo = requestRegistrar.sexo,
                    correo = requestRegistrar.correo
                };

                int result = await SeguridadBL.RegistrarUsuario(usuarioNew);

                ResponseProcessViewModel response = new ResponseProcessViewModel()
                {
                    mensaje = result > 0 ? MENSAJE_EXITO : MENSAJE_FALLO,
                    idUsuario = result
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("Actualizar")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Actualizar(RequestUsuariosViewModel requestActualizar)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                UsuariosDTO usuarioUpdate = new UsuariosDTO()
                {
                    idUsuario = requestActualizar.idUsuario,
                    usuario = requestActualizar.usuario,
                    contrasena = requestActualizar.contrasena,
                    estatus = requestActualizar.estatus,
                    sexo = requestActualizar.sexo,
                    correo = requestActualizar.correo
                };

                int result = await SeguridadBL.ActualizarUsuario(usuarioUpdate);

                ResponseProcessViewModel response = new ResponseProcessViewModel()
                {
                    mensaje = result > 0 ? MENSAJE_EXITO : MENSAJE_FALLO,
                    idUsuario = result
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("Eliminar")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Eliminar(RequestUsuariosViewModel requestEliminar)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                int result = await SeguridadBL.EliminarUsuario(requestEliminar.idUsuario);

                ResponseProcessViewModel response = new ResponseProcessViewModel()
                {
                    mensaje = result > 0 ? MENSAJE_EXITO : MENSAJE_FALLO,
                    idUsuario = result
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("Existe")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Existe(RequestUsuariosViewModel requestExiste)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = await SeguridadBL.ExisteUsuario(requestExiste.usuario);

                ResponseProcessViewModel response = new ResponseProcessViewModel()
                {
                    mensaje = result == true ? MENSAJE_SI_EXISTE : MENSAJE_NO_ENCONTRADO,
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        #endregion "Metodos"
    }
}