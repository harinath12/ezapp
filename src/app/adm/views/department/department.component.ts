import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { department } from '../../models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['../../adm.component.css', './department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: department;
  entries: number = 10;
  status: boolean = true;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows;


  constructor(private cnx: ConnexionService, private router: Router, public toastService: ToastService) {
    this.rows = new Array<department>();
    this.department = new department();
  }

  isLoading: boolean = true;

  obtenerDatos(state: boolean) {
    this.isLoading = true;
    this.cnx.get_data<department>('department').subscribe(myDep => {
      this.rows = myDep;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      this.temp = myDep.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    });
    this.isLoading = false;
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  statusChange($event) {
    this.status = $event.target.value;
    this.obtenerDatos(this.status);
  }

  filterTable($event) {
    let val = $event.target.value.toString().toLowerCase();
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key]) {
          try {
            if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
              return true;
            }
          } catch (error) {
            console.log(d[key], error);
          }
        }
      }
      return false;
    });
  }
  onSelect($event) {
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  editFunction($event) {
    $event.preventDefault();
    this.router.navigate(['/edit-department/' + this.activeRow.DepartmentID]);
  }

  deleteFunction(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to remove ' + this.activeRow.DepartmentName + ' department')) {
      let eliminar: number;
      for (let i = 0; i < this.temp.length; i++) {
        if (this.activeRow.DepartmentID == this.temp[i].DepartmentID) {
          eliminar = i;
          break;
        }
      }
      this.temp.splice(eliminar, 1);
      this.temp = [...this.temp];

      this.success('Department ' + this.activeRow.DepartmentName + ' successfully removed.', 'Alberta Department');
      // this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
    }

  }

  refreshFunction(event) {
    event.preventDefault();
    this.obtenerDatos(this.status);
  }

  exportFunction(event) {
    event.preventDefault();
    this.error('Insufficient disk space', 'Alberta Export');
    
  }

  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }

  ngOnInit() {
    this.obtenerDatos(this.status);
  }

}
