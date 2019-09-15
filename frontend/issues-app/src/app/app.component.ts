import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

class Issue {
  description: string;
  date: Date;
  comments: Comment[];
}

class Comment {
  text: string;
  date: Date;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public issues: Issue[];

  constructor(private http: HttpClient) {
    this.getAllIssues();
  }

  private async getAllIssues() {
    this.http
      .get<Issue[]>("http://localhost:9001/issues")
      .subscribe(res => this.issues = res);
  }

  public createNewIssue() {}

  public deleteIssue() {}

  public saveIssue() {}
}
