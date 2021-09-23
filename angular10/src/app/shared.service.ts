import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="https://localhost:5001/api"

  constructor(private https:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.https.get<any>(this.APIUrl+'/department');
  }

  addDepartment(val:any){
    return this.https.post(this.APIUrl+'/Department',val);
  }

  updateDepartment(val:any){
    return this.https.put(this.APIUrl+'/Department',val);
  }

  deleteDepartment(val:any){
    return this.https.delete(this.APIUrl+'/Department/'+val);
  }

  getEmpList():Observable<any[]>{
    return this.https.get<any>(this.APIUrl+'/Employee');
  }

  addEmployee(val:any){
    return this.https.post(this.APIUrl+'/Employee',val);
  }

  updateEmployee(val:any){
    return this.https.put(this.APIUrl+'/Employee',val);
  }

  deleteEmployee(val:any){
    return this.https.delete(this.APIUrl+'/Employee/'+val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.https.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }
}
