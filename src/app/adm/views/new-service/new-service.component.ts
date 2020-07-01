import { Component, OnInit, ViewChild } from '@angular/core';
import { service } from '../../models/sevice';
import { ConnexionService } from '../../services/connexion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../services/deactivate-guard.service';
import { Observable } from 'rxjs';
import { genericFields } from '../../models/schemas';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('contextServiceForm', { static: false }) contextServiceForm: NgForm;

  service: service;
  serviceID: number;
  isNew: boolean;
  title: string;
  nameButton: string;
  isSaved: boolean = false;
  listTypes: genericFields[] = [];

  constructor(private cnx: ConnexionService, private route: ActivatedRoute, private router: Router, private _location: Location, public toastService: ToastService) {
    this.service = new service();
    this.isNew = true;
    this.isSaved = false;
  }

  isLoading: boolean = false;
  ngOnInit() {
    this.serviceID = this.route.snapshot.params['programId'];

    this.listTypes = [
      {cod:'Individual', value: 'Individual', content: ''},
      {cod:'Group Registration Required', value: 'Group', content: ''}
    ];

    if (!this.serviceID) {
      this.serviceNew();
    } else {
      this.serviceEdit();
    }
  }

  serviceNew() {
    this.isNew = true;
    this.title = "New Service";
    this.nameButton = "Add";
  }

  serviceEdit() {

    this.isLoading = true;
    this.nameButton = "Edit";
    this.isNew = false;
    this.title = "Edit Service";
    this.cnx.get_dataID<service>('program', '?programID=' + this.serviceID).subscribe(myService => {
      this.service = myService;
    });
  }

  saveService() {
    this.cnx.add_dataWithParams<service>('program', '?progJson=', this.service).subscribe(
      myService => {
        switch (myService.toString().toLowerCase()) {
          case 'saved':
            this.toastService.success('Service saved successfully', this.title);
            alert('Service saved successfully');
            this.isSaved = true;
            this.router.navigate(['/service']);
            break;
          case 'error':
            this.toastService.error('An error occurred while trying to save the Service', this.title);
            break;
          default:
            break;
        };
      });
  }

  cancelService() {
    this._location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.contextServiceForm.dirty) {
      if (!this.isSaved) {
        return confirm('Your changes are unsaved!! Do you like to exit');
      }
      return true;
    }
    return true;
  }
}
