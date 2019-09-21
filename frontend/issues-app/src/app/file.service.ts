import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}

  public downloadFile(file: String) {
    const body = { filename: file };
    return this.http.post("http://localhost:9001/issues/fileDownload", body, {
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
