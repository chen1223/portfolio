import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'yamljs';
import { map, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  works = [];
  loadComplete = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  loadWorks(): void {
    if (this.works.length === 0) {
      this.http.get('/assets/works.yaml', {
        observe: 'body',
        responseType: 'text'
      }).pipe(
        map(txt => {
          return parse(txt).works;
        })
      ).subscribe(data => {
        this.works = data.works;
        this.loadComplete.next();
      });
    } else {
      this.loadComplete.next();
    }
  }

  // Return list of all works
  getAllWorks(): Observable<any> {
    if (this.works.length === 0) {
      return new Observable(observer => {
        this.loadComplete.pipe(first()).subscribe(
          () => {
            observer.next(this.works.map(
              (work) => {
                return {
                  id: work.id,
                  title: work.title,
                  preview: work.preview
                };
              }
            ));
            observer.complete();
          }
        );
        this.loadWorks();
      });
    }
    return new Observable((observer) => {
      observer.next(
        this.works.map(
          (work) => {
            return {
              id: work.id,
              title: work.title,
              preview: work.preview
            };
          }
        )
      );
      observer.complete();
    });
  }

  // Get one specific work
  getWork(id: number): Observable<any> {
    if (this.works.length === 0) {
      return new Observable(observer => {
        this.loadComplete.pipe(first()).subscribe(
          () => {
            observer.next(this.works.find(w => +w.id === +id));
            observer.complete();
          }
        );
        this.loadWorks();
      });
    } else {
      return new Observable((observer) => {
        observer.next(
          this.works.find(w => +w.id === +id)
        );
        observer.complete();
      });
    }
  }
}
