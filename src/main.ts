import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-ttcgt58qcsubpg85.us.auth0.com',
      clientId: 'R39CnAq7GBU1WgdVQ0BpqFUMAuJGw4qa',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideHttpClient(),
    appConfig.providers
  ]
}).catch((err) => console.error(err));
