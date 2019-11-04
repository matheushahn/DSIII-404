import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { objectInterestListPage } from './objectInterestList.page';

const routes: Routes = [
  {
    path: '',
    component: objectInterestListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [objectInterestListPage]
})
export class ObjectInterestListPageModule {}
  