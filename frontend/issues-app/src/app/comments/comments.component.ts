import { Component, OnInit, Input } from "@angular/core";
import { FileService } from "../file.service";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {IssueComponent, Issue} from "../issue/issue.component";

 class Comment {
  text: string;
  date: Date;
}

@Component({
  selector: "app-comments",
  templateUrl:'./comments.component.html',
  styleUrls: ["./comments.component.css"],
  providers: [FileService]
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() issueId: string;

  public newComment: Comment;
  constructor(private http: HttpClient) {
    this.newComment = new Comment();
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

    this.http.post(
      environment.BASE_URL + issueId + environment.COMMENT,
      newCommentOnIssue,
      httpOptions
    ).subscribe(() =>{
      console.log("Jajaj");
    })
  }

  ngOnInit() {}
}
