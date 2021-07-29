import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@app/_helpers";
import {HomeComponent} from "@app/home/home.component";
import {WriteComponent} from "@app/write/write.component";
import {ProfileComponent} from "@app/profile/profile.component";
import {ArticleComponent} from "@app/_components/article/article.component";

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'Article', component: ArticleComponent },
  { path: 'write', component: WriteComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
