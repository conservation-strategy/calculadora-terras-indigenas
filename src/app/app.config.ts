import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { IMAGE_CONFIG } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pt',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
