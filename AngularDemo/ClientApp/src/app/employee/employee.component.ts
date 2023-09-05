import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeAPIClient, EmployeeDto } from '../Shared/api-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeAPIClient]
})
export class EmployeeComponent implements OnInit {

  Employee: EmployeeDto[] = [];


  constructor(private service: EmployeeAPIClient, private routeservice: Router) { }

  ngOnInit(): void {
    this.getemployeedetails();
    }
  
  

  getemployeedetails()
  {
    this.service.getAllEmployees().subscribe(res => {
      this.Employee = res;
    })
  }
  deleteEmployee(id:any)
  {
    this.service.deleteEmployee(id).subscribe(res => {
      Swal.fire('Deleted successfully');
      this.getemployeedetails();
    })
    

  }
  








}
