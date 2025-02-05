export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phoneNo: string;
  emailId: string;
  photo?: string | Blob;


  constructor(id: number, firstName: string, lastName: string,dob: Date, gender: string, phoneNo: string,  emailId: string, photo?: string | Blob) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.phoneNo = phoneNo;
    this.emailId = emailId;
    this.photo = photo;
  }
}

