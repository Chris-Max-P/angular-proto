import {RestRequest} from "@data-logic/rest-models/rest-request.request";
import {RestRequestEnum} from "@app-logic/enums/rest-request.enum";

export class I18nRequest extends RestRequest {

  keys: string[];
  constructor(keys: string[]) {
    super(RestRequestEnum.DOWNLOAD_FILE);
    this.keys = keys;
  }
}
