import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ObjectService } from 'src/app/services/object.service';
import { Object } from 'src/app/interfaces/Object';
import { FilterData } from 'src/app/interfaces/FilterData';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  objects: Observable<Object[]>;
  filterData: FilterData;

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private objectService: ObjectService,
    private toastCtrl: ToastController,
    public modalController: ModalController
  ) {
    this.objects= this.objectService.getObjects();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteObject(id: string) {
    try {
      await this.objectService.deleteObject(id);
    } catch (error) {
      this.presentToast('Erro ao tentar remover o objeto');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async applyFilter(){
    if (this.filterData && (this.filterData.searchTerm || this.filterData.category || this.filterData.city || this.filterData.state)) {
      this.objects = this.objectService.getObjectByFilterData(this.filterData);
    } else {
      this.objects = this.objectService.getObjects();
    }
      /** Access filters: data.searchTerm data.state data.city 
       Not being able to access this.objects values to filter them
      */
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: { }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      this.filterData = dataReturned.data;
      this.applyFilter();
    });
 
    return await modal.present();
  }

}