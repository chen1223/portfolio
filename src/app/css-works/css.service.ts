import { APP_DOMAIN } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'yamljs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CssService {
  works = [];
  constructor(private http: HttpClient) { }

  getWorks(): Observable<any> {
    return new Observable(observer => {
      this.http.get(`${APP_DOMAIN}/assets/cssworks.yaml`, {
        observe: 'body',
        responseType: 'text'
      }).pipe(map(txt => {
        return parse(txt);
      })).subscribe(data => {
        this.works = data.works;
        observer.next(this.works);
        observer.complete();
      });
    });
  }
}
