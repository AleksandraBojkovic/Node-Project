import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class FileService {
  constructor(private _http: HttpClient) {}

  downloadFile(file: String) {
    const body = { filename: file };
    return this._http.post("http://localhost:9001/issues/fileDownload", body, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application.json")
    });
  }
}
