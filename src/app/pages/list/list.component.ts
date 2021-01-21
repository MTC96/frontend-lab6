import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { faPencilAlt, faUserTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  faSave = faSave;
  faUserTimes = faUserTimes;
  faPencilAlt = faPencilAlt;

  employees: Employee[] = [];
  editingEmployee: Employee;
  editing: boolean = false;

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.listEmployees()
      .subscribe(employees => {
        employees.map(employee => {
          if (employee.flagTwoYears != '1') {
            this.employeesService.increaseSalary(employee.idEmployee.toString())
              .subscribe(resp => {
                if (resp.flagTwoYears == '1') {
                  for (let i = 0; i < this.employees.length; i++) {
                    if (this.employees[i].idEmployee == resp.idEmployee) {
                      this.employees.splice(i, 1, resp);
                    }
                  }
                }
              });
          }
        });
        this.employees = employees;
      });
  }

  editEmployee(employee: Employee) {
    this.editing = true;
    this.editingEmployee = employee;
  }

  deleteEmployee(employee: Employee) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar el empleado?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeesService.deleteEmployee(employee.idEmployee.toString())
            .subscribe(resp => {
              this.loadEmployees();
              Swal.fire('Eliminado', `${ employee.firstName } ${ employee.lastName }`, 'success');
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');
            });
      }
    });
  }

  updateEmployee(employee: Employee) {
    this.editing = false;
    this.employeesService.updateEmployee(employee)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${ employee.firstName } ${ employee.lastName }`, 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  searchEmployee(term: string) {
    if (term.length === 0) {
      return this.loadEmployees();
    }
    this.employeesService.searchEmployee(term)
      .subscribe(result => {
        this.employees = [result];
      });
  }

}
