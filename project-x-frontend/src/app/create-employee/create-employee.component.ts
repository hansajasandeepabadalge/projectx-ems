import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {FormsModule} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [
    FormsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{
  // @ts-ignore
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router) {

  }


  ngOnInit(): void {

  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employee']);
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }
}
