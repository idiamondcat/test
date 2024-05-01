
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app-routing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { reducers } from './app/redux/reducers/main';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['tasks'],
    rehydrate: true,
    checkStorageAvailability: true,
  })(reducer);
}

export const metaReducers = [
  localStorageSyncReducer,
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
  ]
});

