using AngularDemo.DTO;
using AngularDemo.EFCORE;
using AngularDemo.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDemo.Repository.EmployeeRepository
{
    public class EmployeeRepository: IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
            
            public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddEmployee(AddEmployeeDto emp)
        {
            Employee ob = new Employee();
            ob.EmpName = emp.EmpName;
            ob.EmpSalary = emp.EmpSalary;
            ob.password = emp.password;
            ob.EmailId = emp.EmailId;
            ob.fkRelation = emp.fkRelation;
            if (ob!=null)
            {
                await _context.Employees.AddAsync(ob);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var res = await _context.Employees.Where(x => x.pkEmpId == id).FirstOrDefaultAsync();
            if (res!=null)
            {
                _context.Employees.Remove(res);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<EmployeeDto>> GetallEmployees()
        {
            var res = await _context.Employees.Select(x => new EmployeeDto
            {
                pkEmpId = x.pkEmpId,
                EmpName = x.EmpName,
                EmpSalary = x.EmpSalary,
                EmailId = x.EmailId,
                password = x.password,
                fkRelation = x.fkRelation
            }).ToListAsync();
            return res;
        }

        public async Task<EmployeeDto> GetEmployeebyId(int employeebyId)
        {
            var res = await _context.Employees.Where(x => x.pkEmpId == employeebyId).Select(y => new EmployeeDto
            {
                pkEmpId = y.pkEmpId,
                EmpName = y.EmpName,
                EmpSalary = y.EmpSalary,
                EmailId = y.EmailId,
                password = y.password,
                fkRelation = y.fkRelation
            }).FirstOrDefaultAsync();
            return res;
        }

        public async Task<bool> UpdateEmployee(UpdateEmployeeDto emp)
        {
            var res=await _context.Employees.Where(x=>x.pkEmpId==emp.pkEmpId).FirstOrDefaultAsync();
            if (res!=null)
            {
                res.pkEmpId = emp.pkEmpId;
                res.EmpName = emp.EmpName;
                res.EmpSalary = emp.EmpSalary;
                res.EmailId = emp.EmailId;
                res.password = emp.password;
                res.fkRelation = emp.fkRelation;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
