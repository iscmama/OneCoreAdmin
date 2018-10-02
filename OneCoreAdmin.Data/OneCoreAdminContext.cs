using OneCoreAdmin.Data.Seguridad;
using System.Data.Entity;

namespace OneCoreAdmin.Data
{
    /// <summary>
    /// Clase que nos permite administrar el contexto de la base de datos.
    /// </summary>
    public class OneCoreAdminContext : DbContext
    {
        #region "Constructores"

        /// <summary>
        /// Constructor de la clase
        /// </summary>
        public OneCoreAdminContext() : base("name=OneCoreAdminDB") { }

        #endregion "Constructores"

        #region "Metodos"

        /// <summary>
        /// Método que nos permite inicializar la base de datos.
        /// </summary>
        /// <param name="modelBuilder">Parametro Model Builder</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<OneCoreAdminContext>(null);
            base.OnModelCreating(modelBuilder);
        }

        #endregion "Metodos"

        #region "Propiedades"

        /// <summary>
        /// Propiedad que nos permite administrar la tabla de usuarios.
        /// </summary>
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        #endregion "Propiedades"
    }
}