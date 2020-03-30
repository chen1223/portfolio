import { WorkService } from './../../work.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  workID;
  workData;

  constructor(private activatedRoute: ActivatedRoute,
              private workService: WorkService) { }

  ngOnInit(): void {
    this.setUpRoute();
  }

  // Set up route
  setUpRoute() {
    this.workID = this.activatedRoute.snapshot.url[0].path;
    this.getWorkData();
  }

  // Get work data
  getWorkData() {
    this.workData = this.workService.getWork(this.workID);
    this.workData.date = moment(this.workData.date, 'YYYY-MM').format('MMMM YYYY');
    console.log('work data', this.workData);
  }
}
