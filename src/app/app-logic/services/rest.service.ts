import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {RestRequestEnum} from "@app-logic/enums/rest-request.enum";
import {RestRequest} from "@data-logic/rest-models/rest-request.request";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = environment.contextPath + environment.apiUrl;

  headers = {
    'Authorization': 'Basic ' + btoa('y4754:man.te'),
    'Functional-User': 'chris'
  };

  constructor(private http: HttpClient) {
  }

  post(restRequestObject: RestRequest) {
    return this.http.post(this.apiUrl, this.filterEmptyAttributes(restRequestObject), {'headers': this.headers});
  }

  downloadFile(url: string) {
    const body = {
      "requestType": RestRequestEnum.DOWNLOAD_FILE,
      "correlationId": "",
      "version": environment.restVersion,
    }
    return this.http.get<Blob>(url, {'headers': this.headers, responseType: 'blob' as 'json'});
  }

  filterEmptyAttributes(object: any) {
    return JSON.parse(JSON.stringify(
      object, (key, value) => {
        if (value) return value
      }
    ));
  }

}
