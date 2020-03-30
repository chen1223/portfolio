import { element } from 'protractor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  works = [
    {
      id: 1,
      title: 'UI Design Demonstrations',
      preview: 'https://drive.google.com/uc?id=13l1M1y_NYWttZlFXOYL0_Q_FydG8H2cO',
      // tslint:disable-next-line: max-line-length
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      date: '2020-02',
      demoLink: 'https://chen1223.github.io/design-rules-demo/',
      sourceLink: 'https://github.com/chen1223/design-rules-demo',
      technologies: [
        'Angular 8',
        'SCSS',
        'Responsive Web Design',
        'UI Design Rules'
      ],
      imgs: {
        desktop: 'https://drive.google.com/uc?id=13l1M1y_NYWttZlFXOYL0_Q_FydG8H2cO',
        tablet: 'https://drive.google.com/uc?id=1j7QdlWKaU6_r-TvH0xUpb1jirP4srUAg',
        mobile: 'https://drive.google.com/uc?id=1jZLbkjFtoi7S5VS0D_Gm4Py9dCbsHUAA'
      },
      gifs: {
        desktop: '',
        tablet: '',
        mobile: ''
      }
    },
    {
      id: 2,
      title: 'Backstage Admin Panel',
      preview: 'https://drive.google.com/uc?id=1fFhLFCRX0Iaaw56XQWhxg3jZ9K4h9LCN'
    },
    {
      id: 3,
      title: 'Brian\'s Portfolio',
      preview: 'https://drive.google.com/uc?id=1ltPjwC_5oEA0ytXB4q-5X1zOAWLMxujl'
    },
    {
      id: 4,
      title: 'Animal Doctor',
      preview: 'https://drive.google.com/uc?id=1rombIjYYAAZSIIoG-yFitHGbmVHI546P'
    }
  ];

  constructor() { }

  // Return list of all works
  getAllWorks(): Array<Object> {
    return this.works.map(
      (work) => {
        return {
          id: work.id,
          title: work.title,
          preview: work.preview
        };
      }
    );
  }

  // Get one specific work
  getWork(id: number): Object {
    return this.works.find( w => +w.id === +id);
  }
}
