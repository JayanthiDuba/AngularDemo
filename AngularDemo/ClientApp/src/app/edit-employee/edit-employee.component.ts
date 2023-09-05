import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeAPIClient, EmployeeDto } from '../Shared/api-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [EmployeeAPIClient]
})
export class EditEmployeeComponent implements OnInit {

  EmpId: any;
  ob! :  EmployeeDto;

  constructor(private service: EmployeeAPIClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(x => {
      this.EmpId = x.id;
      this.getEmployeebyId();
     
    })

  }



  getEmployeebyId() {
    
    this.service.getEmployeebyId(this.EmpId).subscribe(res => {
      this.ob = res
    })
  }
  Updateemployee()
  {
    var x = new EmployeeDto();
    x.pkEmpId = this.ob.pkEmpId;
    x.empName = this.ob.empName;
    x.empSalary = this.ob.empSalary;
    x.emailId = this.ob.emailId;
    x.password = this.ob.password;
    x.fkRelation = this.ob.fkRelation;
    this.service.updateEmployee(x).subscribe(res => {
      Swal.fire('Employee updated successfully');
    })
    this.router.navigate(["/employee"])
  }
}
