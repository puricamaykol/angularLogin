What's this about?
------------------

This sample code features a service wrapping some logic for google OAuth rest services.

Usage:

Import and inject it in your class:

    import { GoogleOauthService } from '../google-oauth.service';
    ...
    
    constructor(private googleAuth: GoogleOauthService) { }

It has 3 public methods: initProcess(), getLoginResponse() and getUserProfile().

**Iniating Login Flow:**

    _baseUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';
      _parameters = {
    	  "client_id": "[yours]",
    	  "redirect_uri": "[yours]",
    	  "response_type": "token",
    	  "scope": "https://www.googleapis.com",
    	  "state": ""
      };
     public login(){
    	  this.googleAuth.initProcess(this._baseUrl, this._parameters);
      }
*Parameters object most conform to googleOAutParams*:


    interface googleOAutParams {
    	client_id: string;
    	redirect_uri: string;
    	response_type: string;
    	scope: string;
    	state?: string;
    }
Checking token's validity and fetching user's name:

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
