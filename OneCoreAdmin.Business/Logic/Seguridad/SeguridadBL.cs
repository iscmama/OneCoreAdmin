using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OneCoreAdmin.Data;
using OneCoreAdmin.Data.Seguridad;
using System.Security.Cryptography;

namespace OneCoreAdmin.Business.Logic.Seguridad
{
    public class SeguridadBL
    {
        public static async Task<bool> AutenticarUsuario(string usuario, string contrasena)
        {
            Usuarios user = null;

            try
            {
                using (OneCoreAdminRepository _repo = new OneCoreAdminRepository())
                {
                    user = await _repo.LoginUsuarioAsync(usuario, Encrypt(contrasena));

                    if (user == null)
                    {
                        return false;
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private static string Encrypt(string contrasena)
        {
            try
            {
                MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
                byte[] encrypt;
                UTF8Encoding encode = new UTF8Encoding();
                encrypt = md5.ComputeHash(encode.GetBytes(contrasena));
                StringBuilder encryptdata = new StringBuilder();

                for (int i = 0; i < encrypt.Length; i++)
                {
                    encryptdata.Append(encrypt[i].ToString());
                }

                return encryptdata.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}