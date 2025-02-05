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
  imageSrc: String = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png';

  // @ts-ignore
  id: number;
  // @ts-ignore
  employee: Employee = new Employee();
  // @ts-ignore
  selectedFile: File ;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    // Fetch Employee Data
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
    });

    // Fetch Employee Profile Picture
    this.employeeService.getEmployeePhoto(this.id).subscribe((blob) => {
      this.createImageFromBlob(blob);
    }, error => {
      console.error('Error fetching image:', error);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageSrc = reader.result as string;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data => {
      this.goToEmployeeList();

        const employeeId = this.route.snapshot.params['id'];
        // Upload photo if a file is selected
        if (this.selectedFile) {
          this.uploadPhoto(employeeId);

        } else {
          this.goToEmployeeList();
        }
    },
    error => console.log(error)
    )
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


}
