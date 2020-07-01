import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { department } from '../../models/department';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {

    department: department;
    departmentId: number;
    isNew: boolean;
    title: string;
    nameButton: string;
    rows;
    temp = [];
    myDate = new Date();
    numberAppts: number;
  
    constructor(private cnx: ConnexionService, private route: ActivatedRoute, private router: Router) {
      this.department = new department();
      this.isNew = true;
    }
  
    isLoading: boolean = false;
    ngOnInit() {
      this.departmentId = this.route.snapshot.params['departmentID'];
      if (!this.departmentId) {
        this.departmentNew();
      } else {
        this.departmentEdit();
      }
    }
  
    activeRow : any;
    onActivate(event) {
      this.activeRow = event.row;
    }
  
    departmentNew() {
      this.isNew = true;
      this.department.DepartmentID = 0;
      this.title = 'New Department';
      this.nameButton = 'Add';
    }
  
    departmentEdit() {
      this.isLoading = true;
      this.nameButton = 'Edit';
      this.isNew = false;
      this.title = 'Edit Department';
      this.cnx.get_dataID<department>('department', '?departmentId=' + this.departmentId).subscribe(myDepartment => {
        this.department = myDepartment;
        console.log('this.department',this.department);
      });
      this.isLoading = false;
      
    }
  
    saveClient()
    {
      this.department.ModUser = 46;
      console.log(this.department);
      try {
      this.cnx.add_dataWithParams<department>('department', 'Department?deptJson=' , this.department).subscribe(myDepartment => {
        console.log(myDepartment);
      });
      } catch (error) {
        
      }
    }
  }


