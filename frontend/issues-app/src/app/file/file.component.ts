import { Component, OnInit } from "@angular/core";
import { IssueComponent, Issue } from "../issue/issue.component";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { saveAs } from "file-saver";
import { HttpClient } from "@angular/common/http";
import { FileService } from "../file.service";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.css"]
})
export class FileComponent implements OnInit {
  private uri = environment.URL_URI;
  private uploader: FileUploader;

  attachmentList: any = [];

  constructor(private http: HttpClient, private _fileService: FileService) {
    this.uploader = new FileUploader({ url: this.uri });
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };
  }
  download(index) {
    const filename = this.attachmentList[index].uploadname;

    this._fileService
      .downloadFile(filename)
      .subscribe(data => saveAs(data, filename), error => console.error(error));
  }
  ngOnInit() {}
}
