import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList: any=[];
  ModelTitle:string="";
  ActivateAddEditDepComp: boolean=false;
  dep:any;

  ngOnInit(): void {
    this.refreshDepList();

  }
  clickMessage = '';

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:" "
    }
    this.ModelTitle="Add Department",
    this.ActivateAddEditDepComp=true;
  }

  editClick(item:any){
    this.dep=item;
    this.ModelTitle="Edit Department",
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item:any){
    if (confirm("Are you sure to delete?")){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data =>{
        alert("Delete successfully");
        this.ActivateAddEditDepComp=false;
        this.refreshDepList();
      })
    }

  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
    });
  }

}
