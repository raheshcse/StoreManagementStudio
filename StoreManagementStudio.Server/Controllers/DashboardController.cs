using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;

namespace StoreManagementStudio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly StoreManagementSystemContext _context;

        public DashboardController(StoreManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardData()
        {
            var customers = await _context.Customers.CountAsync();
            var products = await _context.Products.CountAsync();
            var stores = await _context.Stores.CountAsync();
            var sales = await _context.Sales.CountAsync();

            return Ok(new
            {
                customers,
                products,
                stores,
                sales
            });
        }
    }
}