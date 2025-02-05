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
  imageSrc: String = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png';
  // @ts-ignore
  employee: Employee = new Employee();
  // @ts-ignore
  selectedFile: File ;

  constructor(private employeeService: EmployeeService, private router: Router) {

  }


  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {
        console.log('Employee created:', data);

        // @ts-ignore - Get the newly created employee's ID (Assuming backend returns created employee)
        const employeeId = data.id;
        // Upload photo if a file is selected
        if (this.selectedFile) {
          this.uploadPhoto(employeeId);

        } else {
          this.goToEmployeeList();
        }
      },
      error => console.log(error)
    );
  }
  uploadPhoto(employeeId: number) {
    if (this.selectedFile) {
      this.employeeService.uploadEmployeePhoto(employeeId, this.selectedFile).subscribe(response => {
          console.log('Photo uploaded:', response);
          this.goToEmployeeList();
        },
        error => console.error('Photo upload failed:', error)
      );
    }
  }



  goToEmployeeList(){
    this.router.navigate(['/employee']);
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }
}
