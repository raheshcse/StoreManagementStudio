using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;
using StoreManagementStudio.Server.Dtos;
using AutoMapper;

namespace StoreManagementStudio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreManagementSystemContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductsController> _logger; //  Logger added

        public ProductsController(
            StoreManagementSystemContext context,
            IMapper mapper,
            ILogger<ProductsController> logger) //  Inject ILogger
        {
            _context = context;
            _mapper = mapper;
            _logger = logger; // NEW
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            try // Error handling
            {
                var products = await _context.Products.ToListAsync();
                return _mapper.Map<List<ProductDto>>(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving products"); // Logging
                return StatusCode(500, "An error occurred while retrieving products"); // NEW
            }
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            try // NEW
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null) return NotFound();

                return _mapper.Map<ProductDto>(product);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving product with ID {Id}", id); // NEW
                return StatusCode(500, "An error occurred while retrieving the product"); // NEW
            }
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct(ProductDto productDto)
        {
            if (!ModelState.IsValid) // NEW: Runtime validation
                return BadRequest(ModelState);

            try // NEW
            {
                var product = _mapper.Map<Product>(productDto);
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction(
                    nameof(GetProduct),
                    new { id = product.Id },
                    _mapper.Map<ProductDto>(product));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating product"); // NEW
                return StatusCode(500, "An error occurred while creating the product"); // NEW
            }
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDto productDto)
        {
            if (!ModelState.IsValid) // Runtime validation
                return BadRequest(ModelState);

            if (id != productDto.Id)
                return BadRequest("Product ID mismatch");

            try // NEW
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null) return NotFound();

                _mapper.Map(productDto, product);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product with ID {Id}", id); //  NEW
                return StatusCode(500, "An error occurred while updating the product"); // NEW
            }
        }
    }
}
