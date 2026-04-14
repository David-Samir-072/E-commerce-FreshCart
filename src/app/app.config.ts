import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideNgxScrollAnimations } from 'ngx-scroll-animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './error-interceptor';
import { headerInterceptor } from './core/services/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({scrollPositionRestoration:'top'}),
      withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor])),
    provideNgxScrollAnimations({
  speed: 300,
  animationName: 'fade-in-up', // default only
  once: true,
}),
 provideToastr(), // Toastr providers
  ]
};
