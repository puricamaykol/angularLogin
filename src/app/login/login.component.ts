import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { GoogleOauthService } from '../google-oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

	constructor(private http: Http, private googleAuth: GoogleOauthService) { }
  _baseUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';
  _parameters = {
	  "client_id": "35272062455-m15eim6cnehf2v6bajd44a5o289jtg1h.apps.googleusercontent.com",
	  "redirect_uri": "https://puricamaykol.github.io/angularLogin/dist/logincb",
	  "response_type": "token",
	  "scope": "https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
	  "state": "mpGoogleAuthTest"
  };
  public login(){
	  this.googleAuth.initProcess(this._baseUrl, this._parameters);
  }

}
