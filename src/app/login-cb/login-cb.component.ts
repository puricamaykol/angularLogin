import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';

import { GoogleOauthService } from '../google-oauth.service';
//import { Rx } from 'rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';

import { Http } from '@angular/http';
@Component({
	selector: 'app-login-cb',
	templateUrl: './login-cb.component.html',
	styleUrls: ['./login-cb.component.css']
})
export class LoginCbComponent implements OnInit {

	constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router, private googleAuth: GoogleOauthService) { }
	_params: {} = {};
	_tokenValidationUrl: string = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
	_user: any = {};
	_googlePeopleApiBaseUrl = "https://people.googleapis.com/v1/people/me";
	_profile: {} = {};
	ngOnInit() {
		this.googleAuth.getLoginResponse(res => {
			console.log(res, "respuesta");
			if (!res.error) {
				this._user = res;
				this.googleAuth.getUserProfile(this._user.access_token).then(prof => {
					this._profile = prof;
				}).catch(err=>{});
			} else {
				console.log(res.error);
				this.router.navigate(['/login']);
			}
		}, err=>{
			console.log(err);
		});

	}
}
