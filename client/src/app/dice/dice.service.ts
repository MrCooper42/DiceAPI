import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class DiceService {

  constructor(
    private http: Http
  ) { }
  getTotal(formData) {
    console.log(formData, 'form here in service');
    return this.http.post(`/api/roll`, formData)
      .map((res: Response) => {
        console.log(res, 'res in service');
        return res.json()
      }).catch(error => Observable.throw(error.json().error || console.log(error, 'error')));
  }
}