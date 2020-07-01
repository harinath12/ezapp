import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public domain: string;
  public domainEzgoh: string;

  constructor() {
    this.domain = 'http://alberta-api.ezsoftco.com';
  }
}
