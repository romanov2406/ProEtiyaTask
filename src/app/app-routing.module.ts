import { UserResolver } from './shared/resolvers/user.resolver';
import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainComponent } from './layouts/main/main.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  { path: 'user-details/:id', resolve: { UserResolver }, component: UserDetailsComponent },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      { path: 'main-page', component: MainPageComponent },
      { path: 'user-info', component: UserInfoComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ]
  },
  { path: '**', redirectTo: 'main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
