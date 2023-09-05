using AngularDemo.DTO;
using AngularDemo.Repository.EmployeeRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAPIController : ControllerBase
    {
       private readonly IEmployeeRepository _employeeRepository;
        public EmployeeAPIController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<ActionResult> AddEmployee(AddEmployeeDto emp)
        {
            var res= await _employeeRepository.AddEmployee(emp);
            return Ok(res);
        }


        [HttpDelete]
        [Route("DeleteEmployee")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var res=await _employeeRepository.DeleteEmployee(id);
            return Ok(res);
        }


        [HttpGet]
        [Route("GetAllEmployees")]
        public async Task<List<EmployeeDto>> GetAllEmployees()
        {
            var res = await _employeeRepository.GetallEmployees();
            return (res);
        }


        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<ActionResult> UpdateEmployee(UpdateEmployeeDto emp)
        {

            var res = await _employeeRepository.UpdateEmployee(emp);
            return Ok(res);
        }
        [HttpGet]
        [Route("GetEmployeebyId")]
        public async Task<EmployeeDto> GetEmployeebyId(int id)
        {
            var res = await _employeeRepository.GetEmployeebyId(id);
            return (res);
        }
    }
}
