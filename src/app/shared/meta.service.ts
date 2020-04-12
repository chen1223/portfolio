import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { APP_DOMAIN } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta) { }

  // Add page info Meta tags
  addPageMeta(title: string, description) {
    this.clearPageMeta();
    this.meta.addTag({ name: 'title', content: title});
    this.meta.addTag({ name: 'description', content:  description});
  }

  // Remove page info Meta tags
  clearPageMeta() {
    this.meta.removeTag('name="title"');
    this.meta.removeTag('name="description"');
  }

  // Add FB related Meta tags
  addFBTag(ogTitle, ogDesc, ogType, ogImg, ogImgAlt, ogURL) {
    this.clearFBTag();
    if(ogImg=='') {
      ogImg = APP_DOMAIN + '/assets/img/profile.jpg';
    }
    if(ogImgAlt=='') {
      ogImgAlt = 'Bill Chen';
    }
    this.meta.addTags([
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDesc },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: ogURL },
      { property: 'og:image', content: ogImg },
      { property: 'og:image:alt', content: ogImgAlt }
    ]);
  }

  // Remove all FB related Meta tags
  clearFBTag() {
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');
  }
}
