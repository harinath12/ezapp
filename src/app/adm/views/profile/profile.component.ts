import { Component, OnInit } from '@angular/core';
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit() {
  }

  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }

  info(message: string, title: string) {
    this.toastService.info(message, title);
  }

  warn(message: string, title: string) {
    this.toastService.warn(message, title);
  }

  clear() {
    this.toastService.clear();
  }
}
