using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularDemo.Models
{
    public class Employee
    {
        [Key]
        public int pkEmpId { get; set; } 
        public string EmpName { get; set; }
        public int EmpSalary { get; set; }
        public string EmailId { get; set; }
        public string password { get; set; }

        [ForeignKey("fkRelation")]
        public Roles Relation { get; set; }
        public int fkRelation { get; set; }
    }
}
