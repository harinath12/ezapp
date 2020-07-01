import { Component, OnInit } from '@angular/core';
import { service } from '../../models/sevice';
import { ConnexionService } from '../../services/connexion.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['../../adm.component.css', './services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  service: service;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows;

  constructor(private cnx: ConnexionService, private router: Router, public toastService: ToastService) { 
    this.rows = new Array<service>();
    this.service = new service();
  }
  isLoading: boolean = false;

  obtenerDatos() {
    this.isLoading = true;
    this.cnx.get_data<service>('program').subscribe(myAds => {
      this.rows = myAds;
      this.temp = myAds.map((prop, key) => {
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

  refreshFunction(event) {
    event.preventDefault();
    this.obtenerDatos();
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

  onSelect($event) {
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  editFunction($event) {
    $event.preventDefault();
    this.router.navigate(['/edit-service/' + this.activeRow.programId]);
  }

  deleteFunction($event) {
    $event.preventDefault();

    this.cnx.del_data2<service>('program', 'programId', this.activeRow.programId).subscribe(myService => {
      
    });
  }

  ngOnInit() {
    this.obtenerDatos();
  }

  permisoGenerico(nc: number): boolean {
    let res = false;
    //console.log("res", res);
    if(nc > 0){
      res=true;
    }
    else{
      res=false;
    }

    //res = true;
    return res;
  }
}
