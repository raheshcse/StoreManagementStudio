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
            try // NEW: Error handling
            {
                var sales = await _context.Sales
                    .Include(s => s.Product)
                    .Include(s => s.Customer)
                    .Include(s => s.Store)
                    .ToListAsync();

                return _mapper.Map<List<SaleDto>>(sales);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving sales"); // ✅ NEW
                return StatusCode(500, "An error occurred while retrieving sales"); // ✅ NEW
            }
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            try // NEW
            {
                var sale = await _context.Sales.FindAsync(id);
                if (sale == null) return NotFound();

                return _mapper.Map<SaleDto>(sale);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving sale with ID {Id}", id); //  NEW
                return StatusCode(500, "An error occurred while retrieving the sale"); //  NEW
            }
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SaleDto>> PostSale(SaleDto saleDto)
        {
            if (!ModelState.IsValid) // Runtime validation
                return BadRequest(ModelState);

            try // NEW
            {
                var sale = _mapper.Map<Sales>(saleDto);
                _context.Sales.Add(sale);
                await _context.SaveChangesAsync();

                return CreatedAtAction(
                    nameof(GetSale),
                    new { id = sale.Id },
                    _mapper.Map<SaleDto>(sale));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating sale"); //  NEW
                return StatusCode(500, "An error occurred while creating the sale"); //  NEW
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

                _mapper.Map(saleDto, sale);
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
