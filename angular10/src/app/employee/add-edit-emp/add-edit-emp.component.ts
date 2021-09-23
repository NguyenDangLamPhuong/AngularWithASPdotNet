import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() emp:any;
  EmployeeId: string="";
  EmployeeName:  string="";
  DepartmentName: string="";

  ngOnInit(): void {
    this.EmployeeId= this.emp.EmployeeId;
    this.EmployeeName=this.emp.EmployeeName;
    this.DepartmentName=this.emp.DepartmentName;
  }

  addEmployee(){
    var val={EmployeeId :this.EmployeeId, EmployeeName :this.EmployeeName, DepartmentName:this.DepartmentName};
    this.service.addEmployee(val).subscribe(res =>{ alert(res.toString())})
  }

  updateEmployee(){
    var val={EmployeeId :this.EmployeeId,EmployeeName :this.EmployeeName, DepartmentName:this.DepartmentName};
    this.service.updateEmployee(val).subscribe(res =>{ alert(res.toString())})

  }

}
