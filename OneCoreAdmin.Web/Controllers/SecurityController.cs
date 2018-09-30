using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Owin;
using OneCoreAdmin.Web.Models;
using OneCoreAdmin.Business.Logic.Seguridad;
using Newtonsoft.Json;

namespace OneCoreAdmin.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/Security")]
    public class SecurityController : ApiController
    {
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
                    mensaje = result == true ? "success" : "failed",
                    usuario = requestLogin.usuario
                };

                string jsonLogin = JsonConvert.SerializeObject(response);

                return Ok(jsonLogin);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}