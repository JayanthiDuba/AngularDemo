import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddEmployeeDto, EmployeeAPIClient, } from '../Shared/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [EmployeeAPIClient]
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  addemp = new AddEmployeeDto
  constructor(private service: EmployeeAPIClient, private routeservice: Router) {

    this.employeeForm = new FormGroup({
      employeeName: new FormControl('')
    });
  }
  ngOnInit(): void {
      
    }
  addemployee()
  {
    
    this.service.addEmployee(this.addemp).subscribe(res => {
      
      Swal.fire({
        title: 'Success!',
        text: 'Updated Schedule successfully.',
        icon: 'success',
        allowOutsideClick: false,
      }).then(x => {
        if (x.isConfirmed) {
          this.routeservice.navigate(["/employee"])
        }
      });
      
    })
    
  }
}

