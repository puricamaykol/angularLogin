import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private http: Http) { }
  _baseUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';
  _parameters: {} = {
	  "client_id": "35272062455-m15eim6cnehf2v6bajd44a5o289jtg1h.apps.googleusercontent.com",
	  "redirect_uri": "http://localhost/angularMpListTest/dist/logincb",
	 // "redirect_uri": "http://localhost/logincb",
	  "response_type": "token",
	  "scope": "https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
	  "state": "mpGoogleAuthTest"
  };
  public login(){
	  window.open(this._baseUrl+this.serialize(this._parameters), "_blank");
	  //https://accounts.google.com/o/oauth2/revoke?token={token}
  }

  private serialize(obj): string {
	  var str = [];
	  for (var p in obj)
		  if (obj.hasOwnProperty(p)) {
			  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		  }
	  return '?'+str.join("&");
  }

}
