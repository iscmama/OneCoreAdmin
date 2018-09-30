using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using OneCoreAdmin.Data.Seguridad;

namespace OneCoreAdmin.Data
{
    public class OneCoreAdminContext : DbContext
    {
        public OneCoreAdminContext() : base("name=OneCoreAdminDB") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<OneCoreAdminContext>(null);
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Usuarios> Usuarios { get; set; }
    }
}