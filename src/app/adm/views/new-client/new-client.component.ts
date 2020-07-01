import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { client } from '../../models/client';
import { appt } from '../../models/appt';
import { CanComponentDeactivate } from '../../services/deactivate-guard.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['../../adm.component.css', './new-client.component.css']
})
export class NewClientComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('contextGroupForm', { static: false }) contextGroupForm: NgForm;
  client: client;
  clientID: number;
  isNew: boolean;
  title: string;
  nameButton: string;
  rows;
  temp = [];
  appt: appt;
  myDate = new Date();
  numberAppts: number;
  isSaved: boolean = false;

  constructor(private cnx: ConnexionService, private route: ActivatedRoute, private router: Router, private _location: Location, public toastService: ToastService) {
    this.client = new client();
    this.isNew = true;
    this.appt = new appt();
    this.isSaved = false;
  }

  isLoading: boolean = false;
  ngOnInit() {
    this.clientID = this.route.snapshot.params['clientID'];
    if (!this.clientID) {
      this.clientNew();
    } else {
      this.clientEdit();
    }
  }

  activeRow : any;
  onActivate(event) {
    this.activeRow = event.row;
  }

  clientNew() {
    this.isNew = true;
    this.title = "New Client";
    this.nameButton = "Add";
    this.isSaved = false;
  }

  clientEdit() {
    this.isLoading = true;
    this.nameButton = "Edit";
    this.isNew = false;
    this.isSaved = true;
    this.title = "Edit Client";
    this.cnx.get_dataID<client>('client', '?clientId=' + this.clientID).subscribe(myClient => {
      this.client = myClient;
    });

    this.cnx.get_dataWithParams<appt>('appointment', '?clientId=' + this.clientID).subscribe(myAds => {
      this.rows = myAds;
      this.numberAppts = this.rows.length;
      this.temp = myAds.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    });
    this.isLoading = false;
    
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.contextGroupForm.dirty) {
      if (!this.isSaved) {
        return confirm('Your changes are unsaved!! Do you like to exit');
      }
      return true;
    }
    return true;
  }
  
  saveClient()
  {
    this.cnx.add_dataWithParams<client>('client', '?clJson=' , this.client).subscribe(myClient => {
      console.log('res: ',myClient);
      this.toastService.success('Client saved successfully', this.title);
      alert('Client saved successfully');
      this.router.navigate(['/client']);
    });
  }

  cancelGroup() {
    this._location.back();
  }
}
