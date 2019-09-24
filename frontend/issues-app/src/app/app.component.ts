import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FileSelectDirective, FileUploader } from "ng2-file-upload";
import { FileService } from "./file.service";
import { saveAs } from "file-saver";
import { environment } from "../environments/environment";

class Issue {
  _id: string;
  description: string;
  date: Date;
  status: Status;
  comments: Comment[];
}

class Comment {
  text: string;
  date: Date;
}

enum Status {
  PENDING = "pending",
  COMPLETE = "complete"
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [FileService]
})
export class AppComponent {
  public issues: Issue[];
  public newIssueDescription: string;
  public newComment: Comment;
  public statusTypes: Status;
  private uri = environment.URL_URI;
  private uploader: FileUploader;

  attachmentList: any = [];

  constructor(private http: HttpClient, private _fileService: FileService) {
    this.getAllIssues();
    this.newComment = new Comment();
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

  public onChange(event, issueId): void {
    const status = event.target.value;
  }

  private async getAllIssues() {
    this.http.get<Issue[]>(environment.BASE_URL).subscribe(res => {
      this.issues = res;
    });
  }

  public createNewIssue() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const newIssue = {
      description: this.newIssueDescription
    };

    this.http
      .post<string>(environment.BASE_URL, newIssue, httpOptions)
      .subscribe(() => {
        this.getAllIssues();
      });
  }

  public delete(issueId) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    this.http
      .delete(environment.BASE_URL + issueId, httpOptions)
      .subscribe(() => {
        this.getAllIssues();
      });
  }

  public saveIssue(issueId, newDescription, newStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const updateIssue = {
      description: newDescription,
      status: newStatus
    };
    this.http
      .patch(
        environment.BASE_URL + issueId,
        updateIssue,
        httpOptions
      )
      .subscribe(() => {
        alert("saved!");
        this.getAllIssues();
      });
  }

  public createNewComment(issueId) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const newCommentOnIssue = {
      comment: this.newComment.text
    };

    this.http
      .post(
        environment.BASE_URL + issueId + environment.COMMENT,
        newCommentOnIssue,
        httpOptions
      )
      .subscribe(() => {
        this.getAllIssues();
      });
  }
}
