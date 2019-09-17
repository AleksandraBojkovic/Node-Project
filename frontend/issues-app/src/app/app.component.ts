import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

class Issue {
  _id: string;
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
  public newIssueDescription: string;
  public newComment: Comment;

  constructor(private http: HttpClient) {
    this.getAllIssues();
    this.newComment = new Comment();
  }

  private async getAllIssues() {
    this.http.get<Issue[]>("http://localhost:9001/issues").subscribe(res => {
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
    }

    this.http
      .post<string>("http://localhost:9001/issues", newIssue, httpOptions)
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
    this.http.delete("http://localhost:9001/issues/" + issueId, httpOptions)
      .subscribe(() => {
        this.getAllIssues();
      })
  }

  public saveIssue(issueId, newDescription) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const updateIssue = {
      description: newDescription
    };
    this.http.patch("http://localhost:9001/issues/" + issueId, updateIssue,  httpOptions)
    .subscribe(() => {
      alert("saved!");
      this.getAllIssues();
    })
  }

  public createNewComment(issueId) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const newCommentOnIssue = {
      comment: this.newComment.text
    }

    this.http
      .post("http://localhost:9001/issues/" + issueId + "/comment", newCommentOnIssue, httpOptions)
      .subscribe(() => {
        this.getAllIssues();
      });
} 
}
