using System;
using System.Security.Cryptography;
using System.Text;

namespace OneCoreAdmin.Framework.Crypto
{
    /// <summary>
    /// Clase que nos permite administración diversos tipos de Criptografía
    /// </summary>
    public class Encrypting
    {
        #region "Metodos"

        /// <summary>
        /// Método que nos permite encriptar el valor proporcionado con el tipo MD5.
        /// </summary>
        /// <param name="contrasena"></param>
        /// <returns></returns>
        public static string Encrypt(string contrasena)
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
    
        #endregion "Metodos"
    }
}