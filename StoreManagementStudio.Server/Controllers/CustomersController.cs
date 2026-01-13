using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;
using StoreManagementStudio.Server.Dtos;
using AutoMapper;

namespace StoreManagementStudio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly StoreManagementSystemContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<CustomersController> _logger; //  Added ILogger

        public CustomersController(StoreManagementSystemContext context, IMapper mapper, ILogger<CustomersController> logger) // Inject ILogger
        {
            _context = context;
            _mapper = mapper;
            _logger = logger; // Assign ILogger
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            try
            {
                var customers = await _context.Customers.ToListAsync();
                return _mapper.Map<List<CustomerDto>>(customers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all customers"); //  Log exception
                return StatusCode(500, "An error occurred while fetching customers"); // Return meaningful error
            }
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null) return NotFound();

                return _mapper.Map<CustomerDto>(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching customer with ID {CustomerId}", id); //  Log exception
                return StatusCode(500, "An error occurred while fetching the customer"); //  Return meaningful error
            }
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult<CustomerDto>> PostCustomer(CustomerDto customerDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState); //  Added runtime validation check

            try
            {
                var customer = _mapper.Map<Customer>(customerDto);
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, _mapper.Map<CustomerDto>(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating a new customer"); //  Log exception
                return StatusCode(500, "An error occurred while creating the customer"); //  Return meaningful error
            }
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDto customerDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState); //  Added runtime validation check
            if (id != customerDto.Id) return BadRequest("ID mismatch");

            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null) return NotFound();

                _mapper.Map(customerDto, customer);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating customer with ID {CustomerId}", id); //  Log exception
                return StatusCode(500, "An error occurred while updating the customer"); //  Return meaningful error
            }
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null) return NotFound();

                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting customer with ID {CustomerId}", id); //  Log exception
                return StatusCode(500, "An error occurred while deleting the customer"); //  Return meaningful error
            }
        }
    }
}
