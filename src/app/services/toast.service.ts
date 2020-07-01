import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../adm/models/alert';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
  });
  }

    // enable subscribing to alerts observable
    onAlert(alertId?: string): Observable<Alert> {
      return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  // convenience methods
  success(message: string, title: string, alertId?: string) {
      this.alert(new Alert({ message, title, type: AlertType.Success, alertId }));
  }

  error(message: string, title: string, alertId?: string) {
      this.alert(new Alert({ message, title, type: AlertType.Error, alertId }));
  }

  info(message: string, title: string, alertId?: string) {
      this.alert(new Alert({ message, title, type: AlertType.Info, alertId }));
  }

  warn(message: string, title: string, alertId?: string) {
      this.alert(new Alert({ message, title, type: AlertType.Warning, alertId }));
  }

  // main alert method    
  alert(alert: Alert) {
      this.keepAfterRouteChange = alert.keepAfterRouteChange;
      this.subject.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
      this.subject.next(new Alert({ alertId }));
  }
}