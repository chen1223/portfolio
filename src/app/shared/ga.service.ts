import { Injectable } from '@angular/core';
// tslint:disable-next-line: ban-types
declare let ga: Function;
@Injectable({
  providedIn: 'root'
})
export class GaService {

  constructor() { }

  emitEvent(eventCategory: string,
            eventAction: string,
            eventLabel: string = null,
            eventValue: number = null): void {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }
}
