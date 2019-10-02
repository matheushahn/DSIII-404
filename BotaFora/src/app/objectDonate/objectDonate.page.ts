import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectService } from 'src/app/services/object.service';
import { ActivatedRoute } from '@angular/router';
import { Object } from 'src/app/interfaces/Object';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription, Observable } from 'rxjs';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx"
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/Category';

@Component({
  selector: 'app-objectDonate',
  templateUrl: './objectDonate.page.html',
  styleUrls: ['./objectDonate.page.scss'],
})
export class ObjectDonatePage implements OnInit {
  private objectId: string = null;
  private imageSrc: string;
  public object: Object = {};
  private loading: any;
  private objectSubscription: Subscription;
  objectDonateFormGroup: FormGroup;
  categories: Observable<Array<Category>>;

  constructor(
    private objectService: ObjectService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private _alertController: AlertController,
    private _camera: Camera,
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
      cep: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      category: ["", [Validators.required]]
    });
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() { 
  }

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
    this.objectDonateFormGroup.value.imageSrc = this.imageSrc ? this.imageSrc : ""; 

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

  async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      targetWidth: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    };

    const galeryOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      targetWidth: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    const alert = await this._alertController.create({
      header: "Selecione a imagem",
      message: "Escolha a origem da imagem",
      buttons: [
        {
          text: "Câmera",
          handler: () => {
            this._camera.getPicture(cameraOptions)
              .then((imageData) => {
                this.imageSrc = "data:image/jpeg;base64," + imageData;
              })
          }
        }, {
          text: "Galeria",
          handler: () => {
            this._camera.getPicture(galeryOptions)
              .then((imageData) => {
                this.imageSrc = "data:image/jpeg;base64," + imageData;
              })
          }
        }
      ]
    });

    await alert.present();
  }
}