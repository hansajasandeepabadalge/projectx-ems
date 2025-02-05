import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = "http://localhost:8080/api/v1/employees";
  public httpclient;

  constructor(public injector: Injector) {
    this.httpclient = this.injector.get(HttpClient);
  }

  getEmployeesList(): Observable<Employee[]> {
    return this.httpclient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpclient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpclient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpclient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }

  uploadEmployeePhoto(id: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpclient.post(`${this.baseURL}/${id}/uploadPhoto`, formData, { responseType: 'text' });
  }


  getEmployeePhoto(id: number): Observable<Blob> {
    return this.httpclient.get(`${this.baseURL}/${id}/photo`, {
      responseType: 'blob',
    });
  }
}
