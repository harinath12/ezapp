import { Component, OnInit } from '@angular/core';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {


  constructor(private cnx: ConnexionService) { }

  ngOnInit() {
    this.cnx.showMessage(false);
  }

}
