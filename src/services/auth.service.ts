import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Constants } from 'src/helpers/constants';

const oAuthConfig: AuthConfig ={
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: Constants.GOOGLE_CLIENT_ID,
  scope: 'openid profile email',
  waitForTokenInMsec: 2000
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  
constructor(private readonly oAuthService: OAuthService){
  oAuthService.configure(oAuthConfig)
  // oAuthService.loadDiscoveryDocument().then(()=>{
  //   // oAuthService.tryLoginImplicitFlow().then(()=>{
  //     if(oAuthService.hasValidAccessToken()){
  //       oAuthService.loadUserProfile().then((userProfile: any)=>{
  //         console.log(JSON.stringify(userProfile));
  //       })
  //     }
  //   // })
  // })

  oAuthService.loadDiscoveryDocumentAndTryLogin().then(()=> {
    console.log("try login ");
    
  })

}

get isLoggedIn() {
  return !!this.oAuthService.getIdToken();
}


signInWithGoogle () {
  // this.oAuthService.configure(oAuthConfig)
  // this.oAuthService.loadDiscoveryDocument().then(()=>{
  //   this.oAuthService.tryLoginImplicitFlow().then(()=>{
  //     if(!this.oAuthService.hasValidAccessToken()){
  //       this.oAuthService.initLoginFlow()
  //     } else {
  //         this.oAuthService.loadUserProfile().then((userProfile: any)=>{
  //           console.log(JSON.stringify(userProfile));
  //         })
  //     }
  //   })
  // })

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