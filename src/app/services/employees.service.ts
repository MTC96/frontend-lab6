import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  listEmployees() {
    const url = `${ url_base }/listAll`;
    return this.http.get<Employee[]>(url);
  }

  increaseSalary(id: string) {
    const url = `${ url_base }/increaseSalary/${ id }`;
    return this.http.get<Employee>(url);
  }

  createEmployee(employee: Employee) {
    const url = `${ url_base }/save`;
    return this.http.post(url, employee);
  }

  updateEmployee(employee: Employee){
    const url = `${ url_base }/update`;
    return this.http.post(url, employee);
  }

  deleteEmployee(id: string){
    const url = `${ url_base }/delete/${ id }`;
    return this.http.delete(url);
  }

  searchEmployee(term: string = '') {
    const url = `${url_base}/list/${term}`;
    return this.http.get<Employee>(url);
  }

}
