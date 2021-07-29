import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DialogOverviewLogin,DialogOverviewSignin, HeaderComponent} from './_components/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogOverviewWriteArticle, WriteArticleComponent} from "./_components/write-artilce/write-article.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {AngularMaterialModule} from "./_materials/angular-material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { WriteComponent } from './write/write.component';
import { ProfileComponent } from './profile/profile.component';
import { MarkedPipe } from '@app/_pipes';
import { DateAgoPipe } from '@app/_pipes';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {QuillModule} from "ngx-quill";
import { ArticleComponent } from './_components/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogOverviewLogin,
    DialogOverviewSignin,
    DialogOverviewWriteArticle,
    WriteArticleComponent,
    HomeComponent,
    WriteComponent,
    ProfileComponent,
    MarkedPipe,
    DateAgoPipe,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
