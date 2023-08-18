import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './home/pages/main-page/main.component';
import { RegisterComponent } from './home/pages/register-page/register.component';
import { LoginComponent } from './home/pages/login-page/login.component';
import { AdminPageComponent } from './home/pages/admin-pages/admin-page/admin-page.component';
import { LogoutComponent } from './home/components/logout/logout.component';
import { AdminUserPageComponent } from './home/pages/admin-pages/admin-user-profile-page/admin-user-page.component';
import { ProfileComponent } from './home/pages/user-profile-page/profile.component';

import { adminGuardGuard } from './core/guards/admin-guard.guard';
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPageComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [adminGuardGuard],
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin-page/:id', component: AdminUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
