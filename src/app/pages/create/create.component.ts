import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeesService,
              private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      educationalLevel: ['', Validators.required],
      salary: ['', Validators.required],
      role: ['', Validators.required],
      address: ['', Validators.required],
      office: ['', Validators.required],
      dependency: ['', Validators.required],
      startingDate: ['', Validators.required],
      flagTwoYears: ['0']
    });
  }

  createEmployee() {
    this.employeeService.createEmployee(this.employeeForm.value)
    .subscribe(resp => {
      Swal.fire('Agregado', 'Empleado agregado correctamente', 'success')
        .then(() => {
          this.router.navigateByUrl('/list');
        });
      ;
    }, err => {console.log(err);});
  }
}
