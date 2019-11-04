import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectInterestListPage } from './objectInterestList.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectInterestListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjectInterestListPage]
})
export class ObjectInterestListPageModule {}
  