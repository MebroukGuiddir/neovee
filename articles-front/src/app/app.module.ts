import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DialogOverviewLogin,DialogOverviewSignin, HeaderComponent} from './_components/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {DialogOverviewWriteArticle, WriteArticleComponent} from "./_components/write-artilce/write-article.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogOverviewLogin,
    DialogOverviewSignin,
    DialogOverviewWriteArticle,
    WriteArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
