// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

import { MainComponent } from './app/components/main/main.component';

bootstrapApplication(AppComponent, {
  providers: [
    // importProvidersFrom(BrowserModule),
    provideRouter([{ path: '', component: MainComponent, pathMatch: 'full' }]),
  ],
}).catch((err) => console.error(err));
