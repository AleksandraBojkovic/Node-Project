import { Component, Input } from "@angular/core";
import { FileService } from "./file.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [FileService]
})

export class AppComponent {
constructor(){}
}

  