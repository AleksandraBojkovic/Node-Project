import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from "file-saver";


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
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [FileService]

})
export class IssueComponent implements OnInit {

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
  ngOnInit() {
  }

}
