import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/user/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { DsSinhvienComponent } from './_components/ds-sinhvien/ds-sinhvien.component';
import { DsHocphanComponent } from './_components/ds-hocphan/ds-hocphan.component';
import { DsKithiComponent } from './_components/ds-kithi/ds-kithi.component';
import { UserComponent } from './_components/user/user.component';
import { HocphanComponent } from './_components/ds-hocphan/hocphan/hocphan.component';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo} from '@angular/fire/auth-guard';
import 'firebase/auth';
import { KithiComponent } from './_components/ds-kithi/kithi/kithi.component';
import { SessionComponent } from './_components/session/session.component';

const adminOnly = () => hasCustomClaim('admin'); // chỉ admin mới được truy cập
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']); // chuyển hướng sang trang đăng nhập nếu chưa đăng nhập
const redirectLoggedInToHome = () => redirectLoggedInTo(['']); // chuyển hướng về trang chủ

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'ds-sinhvien',
    component: DsSinhvienComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'ds-hocphan',
    component: DsHocphanComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  // tslint:disable-next-line: max-line-length
  {
    path: 'ds-hocphan/:id',
    component: HocphanComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'ds-sinhvien',
    component: DsSinhvienComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'ds-kithi',
    component: DsKithiComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'ds-kithi/:id',
    component: KithiComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'ds-kithi/cathi/:id',
    component: SessionComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
