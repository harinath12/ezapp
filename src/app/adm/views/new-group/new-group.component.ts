import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { group, permisions } from '../../models/schemas';
import { companyServices } from '../../models/sevice';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../services/deactivate-guard.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('groupForm', { static: false }) groupForm: NgForm;

  group: group;
  groupId: number;
  isNew: boolean;
  title: string;
  nameButton: string;
  isSaved: boolean = false;

  groupPermisionsView: boolean[];
  groupPermisionsEdit: boolean[];
  companyService: companyServices[] = [];

  constructor(private cnx: ConnexionService, private route: ActivatedRoute, private router: Router, private _location: Location, public toastService: ToastService) {
    this.group = new group();
    this.isNew = true;
    this.isSaved = false;
  }
  /**
   * api/Group?groupId={groupId}
   */
  ngOnInit() {
    this.groupPermisionsView = [];
    this.groupPermisionsEdit = [];
    this.groupId = this.route.snapshot.params['groupID'];

    // extrae de la bd los datos CompanyServices
    this.cnx.get_data<companyServices>('companyServices').subscribe(
      myCompanyServices => {
        this.companyService = myCompanyServices;
        for (let i = 0; i < myCompanyServices.length; i++) {
          this.groupPermisionsView.push(false);
          this.groupPermisionsEdit.push(false);
        }
        if (!this.groupId) {
          this.groupNew();
        } else {
          this.groupEdit();
        }
      },
      error => {
        console.log('Error: ', error);

      }
    );
    // extrae de la bd los datos GROUP

  }

  groupNew() {
    this.isNew = true;
    this.group = new group;
    this.group.groupID = 0;
    this.group.groupPermisions = new Array<permisions>();
    this.title = "New Group";
    this.nameButton = "Add";
  }

  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }
  groupEdit() {
    this.nameButton = "Edit";
    this.isNew = false;
    this.title = "Edit Group";
    this.cnx.get_dataID<group>('group', '?groupId=' + this.groupId).subscribe(myGroup => {
      this.group = myGroup;
      for (let i = 0; i < this.companyService.length; i++) {
        let view = false;
        let edit = false;
        for (let j = 0; j < this.group.groupPermisions.length; j++) {
          if (this.companyService[i].serviceId == this.group.groupPermisions[j].key) {
            view = this.group.groupPermisions[j].view;
            edit = this.group.groupPermisions[j].edit;
            break;
          }
        }
        this.groupPermisionsView.shift();
        this.groupPermisionsEdit.shift();
        this.groupPermisionsView.push(view);
        this.groupPermisionsEdit.push(edit);
      }

    });
  }

  saveGroup() {

    //this.group.delLocations = [];
    //this.group.selLocations = [];
    //this.group.modUser = 0;

    for (let i = 0; i < this.companyService.length; i++) {
      if (!this.isNew) {
        this.group.groupPermisions.shift();
      }
      this.group.groupPermisions.push({ key: this.companyService[i].serviceId, view: this.groupPermisionsView[i], edit: this.groupPermisionsEdit[i] });
    }

    this.cnx.add_dataWithParams<group>('group', '?groupDatajson=', this.group).subscribe(myGroup => {
      switch (myGroup.toString()) {
        case 'saved':
          alert('Group saved successfully');
          this.toastService.success('Group saved successfully', this.title);
          this.router.navigate(['/group']);
          break;
        case 'error':
          this.toastService.error('An error occurred while trying to save the Group', this.title);
          break;
        default:
          break;
      }
    });
  }

  cancelGroup() {
    this._location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.groupForm.dirty) {
      if (!this.isSaved) {
        return confirm('Your changes are unsaved!! Do you like to exit');
      }
      return true;
    }
    return true;
  }

}