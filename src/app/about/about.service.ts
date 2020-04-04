import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'yamljs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  skills = [];

  constructor(private http: HttpClient) { }

  loadSkills(): Observable<any> {
    return new Observable(observer => {
      if (this.skills.length === 0) {
        this.http.get('/assets/skills.yaml', {
          observe: 'body',
          responseType: 'text'
        }).pipe(map(txt => {
          return parse(txt);
        })).subscribe(data => {
          this.skills = data.skills;
          observer.next(this.skills);
          observer.complete();
        })
      } else {
        observer.next(this.skills);
        observer.complete();
      }
    });
  }
}
