import { Injectable,  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class DiceService {

  constructor(
    private http: Http
  ) { }
  getTotal(roll) {
return this.http.get(`/api/dice`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json().error || console.log(error, 'error')));
  }
}