import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/Category';
import { Observable } from 'rxjs';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  // Data passed in by componentProps
  userId: String;
  objectId: String;

  constructor(
      private modalController: ModalController,
      private navParams: NavParams
  ) { 
      
  }

  ngOnInit() {
      this.userId = this.navParams.data.userId;
      this.objectId = this.navParams.data.objectId;
      console.log(this.userId);
  }

  async closeChatModal(){
      await this.modalController.dismiss();
  }

}
