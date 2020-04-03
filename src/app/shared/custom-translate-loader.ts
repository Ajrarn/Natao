// custom-translate-loader.ts
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';
import { translations as frTranslations } from '../../assets/i18n/fr.json';
import { translations as enTranslations } from '../../assets/i18n/en.json';

export class CustomTranslateLoader implements TranslateLoader {

  languages = [
    {
      language: 'fr',
      translations: frTranslations
    },
    {
      language: 'en',
      translations: enTranslations
    }
  ];

  getTranslation(lang: string): Observable<any> {

    return from(this.languages.filter(item => item.language === lang).map(item => item.translations));
  }
}
