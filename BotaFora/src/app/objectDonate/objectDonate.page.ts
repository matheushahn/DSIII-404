import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectService } from 'src/app/services/object.service';
import { ActivatedRoute } from '@angular/router';
import { Object } from 'src/app/interfaces/Object';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objectDonate',
  templateUrl: './objectDonate.page.html',
  styleUrls: ['./objectDonate.page.scss'],
})
export class ObjectDonatePage implements OnInit {
  private objectId: string = null;
  public object: Object = {};
  private loading: any;
  private objectSubscription: Subscription;
  objectDonateFormGroup: FormGroup;

  constructor(
    private objectService: ObjectService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    formBuilder: FormBuilder
  ) {
    this.objectDonateFormGroup = formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      cep: ["", [Validators.required]]
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.objectSubscription) this.objectSubscription.unsubscribe();
  }

  loadObject() {
    this.objectSubscription = this.objectService.getObject(this.objectId).subscribe(data => {
      this.object = data;
    });
  }

  async saveObject() {
    await this.presentLoading();

    this.objectDonateFormGroup.value.userId = this.authenticationService.getAuth().currentUser.uid;

    this.objectDonateFormGroup.value.createdAt = new Date().getTime();

    try {
      await this.objectService.addObject(this.objectDonateFormGroup.value);
      await this.loading.dismiss();

      this.navCtrl.navigateBack('/home');
    } catch (error) {
      this.presentToast('Erro ao tentar salvar o objeto');
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}