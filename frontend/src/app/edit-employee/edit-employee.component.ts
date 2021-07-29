import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

import { EmployeeService } from '../service/employee.service'
import { Employee } from '../model/employee.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee = new Employee();
  id: any;
  data: any;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    salary: new FormControl(''),
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  getData() {
    this.employeeService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.employee = this.data;
      this.form = new FormGroup({
        name: new FormControl(this.employee.name),
        email: new FormControl(this.employee.email),
        salary: new FormControl(this.employee.salary),
      })
    })
  }

  updateData() {
    this.employeeService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.router.navigateByUrl('/')
    })
  }

}
