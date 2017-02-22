import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class DiceService {

  constructor(
    private http: Http
  ) { }
  getTotal() {
    console.log('here in service')
    return this.http.get(`/api/roll`)
      .map((res: Response) => {
        console.log(res, 'res in service')
        return res.json()
      }).catch(error => Observable.throw(error.json().error || console.log(error, 'error')));
  }
}