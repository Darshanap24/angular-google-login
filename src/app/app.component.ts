import { Component } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Constants } from 'src/helpers/constants';
import { AuthService } from 'src/services/auth.service';

const oAuthConfig: AuthConfig ={
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: Constants.GOOGLE_CLIENT_ID,
  scope: 'openid profile email',
  waitForTokenInMsec: 2000
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-google-login';

   
constructor(private readonly oAuthService: OAuthService){
  oAuthService.configure(oAuthConfig)

  oAuthService.loadDiscoveryDocumentAndTryLogin().then(()=> {
    console.log("try login ");
    
  })

}

get isLoggedIn() {
  return !!this.oAuthService.getIdToken();
}


signInWithGoogle () {
  if( this.isLoggedIn ){ 
    this.oAuthService.logOut()
  } else {
    this.oAuthService.initLoginFlow()
  }
}

get claims() {
  return this.oAuthService.getIdentityClaims() as any;
}

}
