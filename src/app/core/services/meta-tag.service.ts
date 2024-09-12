import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {

  constructor(private meta: Meta, private titleService: Title, private translate: TranslateService) {}

  updateMetaTags(config: { title_key?: string; description_key?: string; filename?: string;}) {
    
    if (config.title_key) {
      var title_prefix = this.translate.instant('metatags.title-prefix');
      var title = this.translate.instant(config.title_key);
      var page_title = title_prefix + ' | ' + title;
      this.titleService.setTitle(page_title);
      this.meta.updateTag({ name: 'title', content: page_title }); 
    }

    if (config.description_key) {
      var description = this.translate.instant(config.description_key);
      this.meta.updateTag({ name: 'description', content: description });
    }

    if (config.filename) {
      let filepath = './assets/images/icons/' + config.filename;
      this.meta.updateTag({ name: 'og:image', content: filepath });
    }

  }
}