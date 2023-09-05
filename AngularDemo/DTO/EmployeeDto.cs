namespace AngularDemo.DTO
{
    public class EmployeeDto
    {
        public int pkEmpId { get; set; }
        public string EmpName { get; set; }
        public int EmpSalary { get; set; }
        public string EmailId { get; set; }
        public string password { get; set; }
        public int fkRelation { get; set; }
    }
    public class AddEmployeeDto
    {
        public string EmpName { get; set; }
        public int EmpSalary { get; set; }
        public string EmailId { get; set; }
        public string password { get; set; }
        public int fkRelation { get; set; }
    }
    public class UpdateEmployeeDto
    {
        public int pkEmpId { get; set; }
        public string EmpName { get; set; }
        public int EmpSalary { get; set; }
        public string EmailId { get; set; }
        public string password { get; set; }
        public int fkRelation { get; set; }
    }
}
