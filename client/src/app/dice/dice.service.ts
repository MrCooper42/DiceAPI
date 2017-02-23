import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';


@Injectable()
export class DiceService {

  constructor(
    private http: Http
  ) { }

  getTotal(formData) {
    return this.http.post(`/api/roll`, formData)
      .map((res: Response) => {
        return res.json();
      }).catch(error => Observable.throw(error.json().error || console.log(error, 'error')));
  }

  getProbability(formData) {
    return this.http.post(`/api/probability`, formData)
      .map((res: Response) => {
        return res.json();
      }).catch(error => Observable.throw(error.json().error || console.log(error, 'error')));
  }
}
