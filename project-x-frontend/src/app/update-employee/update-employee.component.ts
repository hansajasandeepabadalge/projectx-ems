import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../employee';

@Component({
  selector: 'app-update-employee',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  // @ts-ignore
  id: number;
  // @ts-ignore
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // @ts-ignore
    this.employeeService.getEmployeeById(this.id).subscribe((data => {
      this.employee = data;
    }
    ))
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data => {
      this.goToEmployeeList();
    },
    error => console.log(error)
    )
  }
  goToEmployeeList(){
    this.router.navigate(['/employee']);
  }


}
