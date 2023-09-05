using AngularDemo.DTO;

namespace AngularDemo.Repository.EmployeeRepository
{
    public interface IEmployeeRepository
    {
        Task<List<EmployeeDto>> GetallEmployees();
        Task<bool> AddEmployee(AddEmployeeDto emp);
        Task<bool>UpdateEmployee(UpdateEmployeeDto emp);
        Task<bool>DeleteEmployee(int id);
        Task<EmployeeDto>GetEmployeebyId(int  employeebyId);
    }
}
