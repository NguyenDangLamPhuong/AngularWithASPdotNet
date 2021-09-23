import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList: any=[];
  ModelTitle:string="";
  ActivateAddEditEmpComp: boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  clickMessage = '';

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:" ",
      DepartmentName:""
    }
    this.ModelTitle="Add Employee",
    this.ActivateAddEditEmpComp=true;
  }

  editClick(item:any){
    this.emp=item;
    this.ModelTitle="Edit Employee",
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if (confirm("Are you sure to delete?")){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data =>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }

  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }


}
