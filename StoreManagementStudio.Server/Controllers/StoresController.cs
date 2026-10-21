using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;
using StoreManagementStudio.Server.Dtos;
using AutoMapper;

namespace StoreManagementStudio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly StoreManagementSystemContext _context;
        private readonly IMapper _mapper;

        public StoresController(StoreManagementSystemContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
        {
            var stores = await _context.Stores
                .AsNoTracking()
                .ToListAsync();

            return Ok(_mapper.Map<List<StoreDto>>(stores));
        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            var store = await _context.Stores
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);

            if (store == null)
                return NotFound();

            return Ok(_mapper.Map<StoreDto>(store));
        }

        // POST: api/Stores
        [HttpPost]
        public async Task<ActionResult<StoreDto>> PostStore(StoreDto storeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var store = _mapper.Map<Store>(storeDto);
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            var resultDto = _mapper.Map<StoreDto>(store);

            return CreatedAtAction(nameof(GetStore), new { id = store.Id }, resultDto);
        }

        // PUT: api/Stores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, StoreDto storeDto)
        {
            if (id != storeDto.Id)
                return BadRequest("Store ID mismatch");

            var store = await _context.Stores.FindAsync(id);
            if (store == null)
                return NotFound();

            _mapper.Map(storeDto, store);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
                return NotFound();

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
