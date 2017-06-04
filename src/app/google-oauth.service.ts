import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Router, ActivatedRoute, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';
//import { Rx } from 'rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';
@Injectable()
export class GoogleOauthService {

	constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) { }

	private queryString: string = '';
	private oAuthParams: googleOAutParams;
	private baseUrl: string = '';
	private tokenValidationUrl: string = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
	private user: {} = {};
	private googlePeopleApiBaseUrl = "https://people.googleapis.com/v1/people/me";
	private profile: {} = {};

	/**
	 * This method initiates login flow
	 * @param {string}           baseUrl Url Base para la peticion
	 * @param {googleOAutParams} params  Objeto de parámetros a ser enviados
	 */
	public initProcess(baseUrl: string, params: googleOAutParams): void {
		this.baseUrl = baseUrl;
		this.oAuthParams = params;
		let url = this.baseUrl + this.serializeParams(this.oAuthParams);
		window.open(url, "_blank");
	}
	/**
	 * Methods that parses params on redirect url 
	 * @param {Function} callback Cb to get response from token validation
	 */
	public getLoginResponse(success, error): void {
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
					me.tokenValidationUrl = me.tokenValidationUrl + array['access_token'];
					me.validateToken().then(res => {
						if (!res.error) {
							res.access_token = array['access_token'];
						}
						success(res);
					}).catch(error(this.handleError));
				}
			});
	}
	/**
	 * Gets user profile from google people API
	 * @param  {string}       at Access Token
	 * @return {Promise<any>}    User profile Names Object
	 */
	public getUserProfile(at: string): Promise<any> {
		let url = this.googlePeopleApiBaseUrl + "?access_token=" + at + "&requestMask.includeField=person.names";

		return this.http.get(url)
			.toPromise()
			.then(response => (
				{
					"displayName": response.json().names[0].displayName,
					"familyName": response.json().names[0].familyName,
					"givenName": response.json().names[0].givenName,
					"displayNameLastFirst": response.json().names[0].displayNameLastFirst
				}
			))
			.catch(this.handleError);
	}

	/**
	 * Method that turn a googleOAutParams object to a uri Query String
	 * @param  {googleOAutParams} obj Contains Params to Auth
	 * @return {string}            Full url
	 */
	private serializeParams(obj: googleOAutParams): string {
		var str = [];
		for (var property in obj)
			if (obj.hasOwnProperty(property)) {
				str.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
			}
		return '?' + str.join("&");
	}
	/**
	 * Validates token 
	 */
	private validateToken() {
		let url = this.tokenValidationUrl;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}
	/**
	 * Handler http errors
	 * @param  {any}          error [description]
	 * @return {Promise<any>}       [description]
	 */
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

	
}
/**
 * Interface for the googleOAutParams Objects
 */
export interface googleOAutParams {
	client_id: string;
	redirect_uri: string;
	response_type: string;
	scope: string;
	state?: string;
}
