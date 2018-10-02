using NLog;
using System;

namespace OneCoreAdmin.Framework.Logging
{
    /// <summary>
    /// Clase que nos permite el Logging en el sistema.
    /// </summary>
    public class Loggers
    {
        #region "Atributos"

        /// <summary>
        /// Instancia para el manejo de Nlog.
        /// </summary>
        private static Logger logger = LogManager.GetCurrentClassLogger();

        #endregion "Atributos"

        #region "Metodos"

        /// <summary>
        /// Método que nos permite escribir un log del tipo Info
        /// </summary>
        /// <param name="mensaje">Mensaje a registrar</param>
        public static void WriteInfo(string mensaje)
        {
            logger.Info(mensaje);
        }
        /// <summary>
        /// Método que nos permite escribir un log del tipo Error
        /// </summary>
        /// <param name="mensaje">Mensaje a registrar</param>
        /// <param name="ex">Excepción a registrar</param>
        public static void WriteError(string mensaje, Exception ex)
        {
            logger.Error(ex, mensaje);
        }

        #endregion "Metodos"
    }
}