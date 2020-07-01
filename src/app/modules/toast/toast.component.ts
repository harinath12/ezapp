import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertType, Alert } from 'src/app/adm/models/alert';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

declare var $: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() id: string;

  alerts: Alert[] = [];
  subscription: Subscription;
  message: string;
  title: string;
  tipoAlert: string;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }

        // add alert to array
        this.alerts.push(alert);
        this.message = alert.message;
        this.title = alert.title;
        this.tipoAlert = this.cssClass(alert);
        $('.toast').toast('show');
      });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // remove specified alert from array
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

}