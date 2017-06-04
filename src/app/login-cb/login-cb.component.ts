import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';
//import { Rx } from 'rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

import { Http } from '@angular/http';
@Component({
	selector: 'app-login-cb',
	templateUrl: './login-cb.component.html',
	styleUrls: ['./login-cb.component.css']
})
export class LoginCbComponent implements OnInit {

	constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) { }
	_params: {} = {};
	_tokenValidationUrl: string = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
	ngOnInit() {
		// subscribe to router event

		this.activatedRoute.url.subscribe(url => {
			//console.log(url, "url");
		});

		//console.log(this.activatedRoute.snapshot.fragment, "snap shot");
		let urlFragments: string[] = this.activatedRoute.snapshot.fragment.split("&");
		let me = this;
		var source = Observable
			.from(urlFragments)
			.map(fragment => fragment.split("="))
			.map(item => {
				let paramObject = [];
				paramObject[item[0]] = item[1];
				return paramObject;
			})
			.subscribe(array => {
				console.log(array);
				if (array['access_token']) {
					me._tokenValidationUrl = me._tokenValidationUrl + array['access_token'];
					me._validateToken().then(res => {
						if (!res.error) {
							console.log(res, "respuesta completa");
							localStorage.setItem('aud', res.aud);
							localStorage.setItem('expires_in', res.expires_in);
							localStorage.setItem('scope', res.scope);
							localStorage.setItem('user_id', res.user_id);
							localStorage.setItem('access_token', array['access_token']);
							me.router.navigate(['/marvel'])
						} else {
							console.log(res.error);
							me.router.navigate(['/login'])
						}
					}).catch(error => console.log(error));
				}
			});

	}

	private _validateToken() {
		let url = this._tokenValidationUrl;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

}
