import { Component, OnInit } from '@angular/core';
import { client } from '../../models/client';
import { ConnexionService } from '../../services/connexion.service';
import { Router } from '@angular/router';
import { clientPagination, parameters } from '../../models/schemas';
import { Page } from '../../models/page';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['../../adm.component.css', './client-list.component.css']
})
export class ClientListComponent implements OnInit {

  page = new Page();
  //rows = new Array<client>();

  client: client;
  clientPagination: clientPagination[];
  parameters: parameters;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  pageNumber: number;
  pageSize: number;
  rows;

  constructor(private cnx: ConnexionService, private router: Router) {
    this.rows = new Array<client>();
    this.client = new client();
    this.parameters = new parameters();
    this.clientPagination = new Array<clientPagination>();

    this.page.pageNumber = 1;
    this.page.size = 10;
  }

  isLoading: boolean = false;

  obtenerDatos() {
    this.isLoading = true;
    this.cnx.get_dataWithParams<clientPagination>('client', '?ClientRequestParamJson={"Page": ' + (this.page.pageNumber + 1) + ',"PageSize": ' + this.entries + '}').subscribe(myClient => {
      this.parameters = myClient['Parameters'];
      this.clientPagination = myClient;
      this.rows = myClient['Clients'];
      this.page.totalElements = this.parameters.Total;
      this.page.size = this.entries;
      this.page.totalPages = this.page.totalElements / this.page.size;
      this.temp = myClient['Clients'].map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    });
    this.isLoading = false;
  }

  refreshFunction(event) {
    event.preventDefault();
    this.obtenerDatos();
  }

  entriesChange($event) {
    this.entries = $event.target.value;
    this.obtenerDatos();
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
    this.router.navigate(['/edit-client/' + this.activeRow.clientID]);
  }

  deleteFunction($event) {
    $event.preventDefault();
    //this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
    //console.log(this.temp);
    this.cnx.del_data2<client>('client', 'clientDelId', this.activeRow.clientID).subscribe(myClient => {
      console.log(myClient);
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.obtenerDatos();
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.obtenerDatos();
  }

  permisoGenerico(nc: number): boolean {
    let res = false;
    //console.log("res", res);
    if (nc > 0) {
      res = true;
    }
    else {
      res = false;
    }

    //res = true;
    return res;
  }
}
