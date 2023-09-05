using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularDemo.Models
{
    public class Roles
    {
        [Key]
        public int pkRoleId { get; set; }
        public string RoleName { get; set; }
        [InverseProperty("Relation")]
        public List<Employee> Employees { get; set; }
    }
}
