import { APP_DOMAIN } from './../../environments/environment';
import { Injectable } from '@angular/core';

const CONTEXT = 'https://schema.org';

@Injectable({
  providedIn: 'root'
})
export class JsonldService {
  WEBSITE_WORK = 0;
  CSS_WORK = 1;

  constructor() { }
  // Form and return JSON LD for home page
  getHomeJSONLD(): Object {
    const jsonLD = {
      '@Context': CONTEXT,
      '@type': 'Website',
      name: 'Bill Chen | Fullstack Developer',
      url: APP_DOMAIN,
      mainEntity: {
        '@type': 'Person',
        '@id': '#me',
        familyName: 'Chen',
        givenName: 'Bill',
        gender: 'Male',
        name: `Bill Chen`,
        email: 'chen1223@bu.edu',
        hasOccupation: {
          '@type': 'Occupation',
          skills: 'Fullstack developer | Cloud Architect'
        },
        url: `${APP_DOMAIN}/about`
      },
      author: { '@id': '#me' },
      founder: { '@id': '#me' },
      publisher: { '@id': '#me' }
    };
    return jsonLD;
  }

  // Form and return JSON LD for work page
  // type: 0 -> website prjects, 1 -> css works
  getWorkJSONLD(type, works: any[]): Object {
    const jsonLD = {
      '@Context': CONTEXT,
      '@type': 'CollectionPage',
      name: `${ type === 0 ? 'Website projects' : 'CSS works'  } of Bill Chen`,
      headline: `${ type === 0 ? 'Website projects' : 'CSS works'  } of Bill Chen`,
      author: {
        '@type': 'Person',
        '@id': '#me',
        familyName: 'Chen',
        givenName: 'Bill',
        gender: 'Male',
        name: `Bill Chen`,
        email: 'chen1223@bu.edu',
        hasOccupation: {
          '@type': 'Occupation',
          skills: 'Fullstack developer | Cloud Architect'
        },
        url: `${APP_DOMAIN}/about`
      }
    };
    if (works.length > 0) {
      jsonLD['hasPart'] = [];
      works.forEach(work => {
        const obj = {
          '@type': 'CreativeWork',
          name: work.title,
          image: work.preview,
          author: { '@id': '#me' },
          founder: { '@id': '#me' },
          creator: { '@id': '#me' }
        };
        jsonLD['hasPart'].push(obj);
      });
    }
    return jsonLD;
  }

  // Form and return the JSON-LD of a single work
  getSingleWorkJSONLD(data): Object {
    const jsonLD = {
      '@Context': CONTEXT,
      '@type': 'WebPage',
      author: {
        '@type': 'Person',
        '@id': '#me',
        familyName: 'Chen',
        givenName: 'Bill',
        gender: 'Male',
        name: `Bill Chen`,
        email: 'chen1223@bu.edu',
        hasOccupation: {
          '@type': 'Occupation',
          skills: 'Fullstack developer | Cloud Architect'
        },
        url: `${APP_DOMAIN}/about`
      },
      founder: { '@id': '#me' },
      creator: { '@id': '#me' },
      publisher: { '@id': '#me' },
      copyrightHolder: { '@id': '#me' },
      mainEntity: {
        '@type': 'CreativeWork',
        name: data.title,
        image: data.preview,
        about: '',
        text: '',
        author: { '@id': '#me' },
        founder: { '@id': '#me' },
        creator: { '@id': '#me' },
        publisher: { '@id': '#me' },
        copyrightHolder: { '@id': '#me' },
        datePublished: data.date
      }
    };
    // Set about
    for (const txt of data.desc) {
      jsonLD.mainEntity.about += txt;
      jsonLD.mainEntity.text += txt;
    }
    // Set demo link
    if (data.demoLink) {
      jsonLD.mainEntity['exampleOfWork'] = {
        '@type': 'CreativeWork',
        url: data.demoLink
      };
    }
    return jsonLD;
  }

  // Form and return JSON LD for about page
  getAboutJSONLD(profilePic, desc, email, sameAsLink): Object {
    const jsonLD = {
      '@Context': CONTEXT,
      '@type': 'Person',
      image: profilePic,
      email,
      familyName: 'Chen',
      givenName: 'Bill',
      gender: 'Male',
      name: `Bill Chen`,
      hasOccupation: {
        '@type': 'Occupation',
        skills: desc
      },
      sameAs: {
        '@type': 'URL',
        url: sameAsLink
      }
    };
    return jsonLD;
  }
}
