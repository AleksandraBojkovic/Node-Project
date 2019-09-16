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
  public description: string;

  constructor(private http: HttpClient) {
    this.getAllIssues();
  }

  private async getAllIssues() {
    this.http
      .get<Issue[]>("http://localhost:9001/issues")
      .subscribe(res => this.issues = res);
  }

  public createNewIssue() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const newIssue = {
      description: this.description
    }

    this.http.post<string>("http://localhost:9001/issues", newIssue, httpOptions)
    .subscribe(res => {
      this.getAllIssues();
    });    
  }

  public deleteIssue() {}

  public saveIssue() {}
}
