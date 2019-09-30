import { Component, OnInit } from "@angular/core";
import { FileService } from "../file.service";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class Issue {
  _id: string;
  description: string;
  date: Date;
  status: Status;
  comments: Comment[];
}
enum Status {
  PENDING = "pending",
  COMPLETE = "complete"
}
@Component({
  selector: "app-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.css"],
  providers: [FileService]
})
export class IssueComponent implements OnInit {
  public issues: Issue[];
  public newIssueDescription: string;
  public statusTypes: Status;

  constructor(private http: HttpClient, private _fileService: FileService) {
    this.getAllIssues();
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
      .patch(environment.BASE_URL + issueId, updateIssue, httpOptions)
      .subscribe(() => {
        alert("saved!");
        this.getAllIssues();
      });
  }
  ngOnInit() {}
}
