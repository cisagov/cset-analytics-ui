import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class ConfigService {

  apiUrl: string;
  configUrl = 'assets/config.json';

  config: any;
  private initialized: boolean = false;

 constructor(private http: HttpClient) {
  }

  loadConfig() {
    if(!this.initialized){
        return this.http.get(this.configUrl)
            .toPromise() 
            .then((data: any) => {
                this.apiUrl = data.apiUrl;
                this.initialized = true;
            }).catch(error => console.log('Failed to load config file: ' + (<Error>error).message));
        }
    }
}
