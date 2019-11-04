import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { 
    path: 'signup', 
    loadChildren:  () => import('./signup/signup.module').then(m => m.SignupPageModule) 
  },
  { path: 'objectDonate', loadChildren: './objectDonate/objectDonate.module#ObjectDonatePageModule' },
  { path: 'objectDonate/:id', loadChildren: './objectDonate/objectDonate.module#ObjectDonatePageModule' },
  { path: 'objectDetails', loadChildren: './objectDetails/objectDetails.module#ObjectDetailsPageModule' },
  { path: 'objectDetails/:id', loadChildren: './objectDetails/objectDetails.module#ObjectDetailsPageModule' },
  { path: 'objectInterestList', loadChildren: './objectInterestList/objectInterestList.module#ObjectInterestListPageModule' },
  { path: 'objectInterestList/:id', loadChildren: './objectInterestList/objectInterestList.module#ObjectInterestListPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'myObjects', loadChildren: './myObjects/myObjects.module#MyObjectsPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
