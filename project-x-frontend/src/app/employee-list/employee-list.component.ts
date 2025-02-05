import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Employee} from '../employee';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';
// import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  imports: [
    NgForOf,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee',id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
  }
}

