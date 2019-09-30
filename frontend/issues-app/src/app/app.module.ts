import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {FileUploadModule} from 'ng2-file-upload';
import { AppComponent } from '../app/app.component';

import { HttpClientModule } from '@angular/common/http';
import { IssueComponent } from './issue/issue.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsComponent } from './comments/comments.component'; 
import { MatButtonModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import { FileComponent } from './file/file.component';
@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    CommentsComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    MatButtonModule,
    MatInputModule,   
    NoopAnimationsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
