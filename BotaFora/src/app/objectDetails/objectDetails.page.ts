import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ObjectService } from '../services/object.service';
import { AuthenticationService} from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Object } from '../interfaces/Object';
import * as firebase from 'firebase';
import { ObjectInterest } from '../interfaces/ObjectInterest';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-objectDetails',
  templateUrl: './objectDetails.page.html',
  styleUrls: ['./objectDetails.page.scss'],
})
export class ObjectDetailsPage implements OnInit {

  private object: Observable<Object>;
  private interestList: Observable<ObjectInterest[]>;

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    let id = this.activatedRoute.snapshot.params['id'];
    this.object = this.objectService.getObject(id);
    this.interestList = this.objectService.getInterestList(id);
  }

  ngOnInit() { }

  ngOnDestroy() { }

  getCurrentUserId() {
    if(this.authenticationService.getAuth().currentUser)
      return this.authenticationService.getAuth().currentUser.uid;
    return null;
  }

  showEditButton(objectUserId) {
      return objectUserId == this.getCurrentUserId();
  }

  showInterestButton(objectUserId){
      return objectUserId !== this.getCurrentUserId();
  }

  showInterestList(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }

  async addInterest(){
      var userId = this.getCurrentUserId();
      var name: String = await this.userService.getUserName(userId);
      var interest: ObjectInterest = { userId: userId, name: name, timestamp: new Date().getTime()};
      await this.objectService.updateObjectCollection(this.activatedRoute.snapshot.params['id'], "interestList", interest);
      var toast = await this.toastController.create({ message: 'Interesse salvo com sucesso!', duration: 2000});
      toast.present();
  }
}
