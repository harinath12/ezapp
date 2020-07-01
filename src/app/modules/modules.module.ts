import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./toast/toast.component";
import { ToastService } from "../services/toast.service";

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule
  ],
  providers: [ToastService],
  exports: [ToastComponent]
})
export class ModulesModule { }
