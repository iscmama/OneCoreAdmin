using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using OneCoreAdmin.Data.Seguridad;

namespace OneCoreAdmin.Data
{
    public class OneCoreAdminRepository : IDisposable
    {
        private OneCoreAdminContext _context;

        public OneCoreAdminRepository()
        {
            _context = new OneCoreAdminContext();
        }

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
                throw ex;
            }
        }
        public async Task<List<Usuarios>> GetUsersAllAsync()
        {
            try
            {
                return await (from u in _context.Usuarios
                              where u.estatus == true
                              orderby u.fechaCreacion descending
                              select u).ToListAsync<Usuarios>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
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
                throw ex;
            }
        }
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
                throw ex;
            }
        }
        public async Task<bool> ExistUserAsync(int idUsuario)
        {
            try
            {
                var usuario = await _context.Usuarios.SingleAsync(u => u.idUsuario == idUsuario);

                if (usuario != null)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}