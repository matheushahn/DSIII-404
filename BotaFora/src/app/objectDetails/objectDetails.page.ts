import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription, Observable } from 'rxjs';
import { ObjectService } from '../services/object.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Object } from '../interfaces/Object';
import { ObjectInterest } from '../interfaces/ObjectInterest';
import { UserService } from '../services/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-objectDetails',
  templateUrl: './objectDetails.page.html',
  styleUrls: ['./objectDetails.page.scss'],
})
export class ObjectDetailsPage implements OnInit {

  private object: Observable<Object>;
  private interestList: Observable<ObjectInterest[]>;
  isMyUserInterested: Observable<boolean>|null = null;

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    public modalController: ModalController,
    private iab: InAppBrowser
  ) {
    let id = this.activatedRoute.snapshot.params['id'];
    this.object = this.objectService.getObject(id);
    this.interestList = this.objectService.getInterestList(id);
    this.showInterestButton();
  }

  ngOnInit() {}

  ngOnDestroy() { }

  getCurrentUserId() {
    if (this.authenticationService.getAuth().currentUser)
      return this.authenticationService.getAuth().currentUser.uid;
    return null;
  }

  showEditButton(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }

  showInterestButton() {
    this.isMyUserInterested = new Observable<boolean>((observer) => {
      this.interestList.subscribe(interestList => {
        const userId = this.getCurrentUserId();
        let result = interestList.some(item => {
          return item.userId == userId;
        });
        observer.next(result);
      });
    });
  }

  showInterestList(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }

  async addInterest() {
    var userId = this.getCurrentUserId();
    var name: String = await this.userService.getUserName(userId);
    var phoneNumber: String = await this.userService.getUserPhoneNumber(userId);
    var interest: ObjectInterest = { userId: userId, name: name, phoneNumber: phoneNumber, timestamp: new Date().getTime() };
    await this.objectService.updateObjectCollection(this.activatedRoute.snapshot.params['id'], "interestList", interest);
    var toast = await this.toastController.create({ message: 'Interesse salvo com sucesso!', duration: 2000 });
    toast.present();
  }

  openChatModal() {
    const userId = this.getCurrentUserId();
    const objectId = this.activatedRoute.snapshot.params['id'];
    var chatName: string = userId.concat(objectId);
    chatName = chatName.slice(0, 28);
    // The chat name can have 30 or less characters (bf + 28 chars combining object and user)
    const browser = this.iab.create('https://tlk.io/bf' + chatName, '_self');
  }

  openWhatsapp(phone_num) {
    window.open("http://wa.me/55" + phone_num, '_system', 'location=yes');
  }
}
