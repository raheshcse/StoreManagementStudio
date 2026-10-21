using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;
using StoreManagementStudio.Server.Dtos;
using AutoMapper;

namespace StoreManagementStudio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly StoreManagementSystemContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<SalesController> _logger; //  Logger

        public SalesController(
            StoreManagementSystemContext context,
            IMapper mapper,
            ILogger<SalesController> logger) // NEW
        {
            _context = context;
            _mapper = mapper;
            _logger = logger; // NEW
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
            try
            {
                var sales = await _context.Sales
                    .Include(s => s.Product)
                    .Include(s => s.Customer)
                    .Include(s => s.Store)
                    .ToListAsync();

                var result = sales.Select(s => new SaleDto
                {
                    Id = s.Id,
                    ProductId = s.ProductId,
                    CustomerId = s.CustomerId,
                    StoreId = s.StoreId,

                    ProductName = s.Product?.Name ?? "",
                    CustomerName = s.Customer?.Name ?? "",
                    StoreName = s.Store?.Name ?? "",

                    DateSold = s.DateSold
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving sales");
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            try
            {
                var sale = await _context.Sales
                    .Include(s => s.Product)
                    .Include(s => s.Customer)
                    .Include(s => s.Store)
                    .Where(s => s.Id == id)
                    .Select(s => new SaleDto
                    {
                        Id = s.Id,
                        ProductId = s.ProductId,
                        CustomerId = s.CustomerId,
                        StoreId = s.StoreId,
                        DateSold = s.DateSold,

                        // ✅ ADD THIS (you missed earlier)
                        ProductName = s.Product != null ? s.Product.Name : "",
                        CustomerName = s.Customer != null ? s.Customer.Name : "",
                        StoreName = s.Store != null ? s.Store.Name : ""
                    })
                    .FirstOrDefaultAsync();

                if (sale == null) return NotFound();

                return sale;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving sale with ID {Id}", id);
                return StatusCode(500, "Error retrieving sale");
            }
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SaleDto>> PostSale([FromBody] SaleDto saleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var sale = new Sales
                {
                    ProductId = saleDto.ProductId,
                    CustomerId = saleDto.CustomerId,
                    StoreId = saleDto.StoreId,
                    DateSold = saleDto.DateSold
                };

                // ✅ Ensure DateSold is set
                if (sale.DateSold == default)
                    sale.DateSold = DateTime.Now;

                _context.Sales.Add(sale);
                await _context.SaveChangesAsync();

                return CreatedAtAction(
                    nameof(GetSale),
                    new { id = sale.Id },
                    _mapper.Map<SaleDto>(sale));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating sale");
                return StatusCode(500, "Error creating sale");
            }
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDto saleDto)
        {
            if (!ModelState.IsValid) //  NEW
                return BadRequest(ModelState);

            if (id != saleDto.Id)
                return BadRequest("Sale ID mismatch");

            try //  NEW
            {
                var sale = await _context.Sales.FindAsync(id);
                if (sale == null) return NotFound();

                sale.ProductId = saleDto.ProductId;
                sale.CustomerId = saleDto.CustomerId;
                sale.StoreId = saleDto.StoreId;
                sale.DateSold = saleDto.DateSold;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating sale with ID {Id}", id); //  NEW
                return StatusCode(500, "An error occurred while updating the sale"); // NEW
            }
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            try //  NEW
            {
                var sale = await _context.Sales.FindAsync(id);
                if (sale == null) return NotFound();

                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting sale with ID {Id}", id); //  NEW
                return StatusCode(500, "An error occurred while deleting the sale"); //  NEW
            }
        }
    }
}
