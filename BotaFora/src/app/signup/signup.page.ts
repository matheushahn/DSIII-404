import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class signupPage implements OnInit {


    constructor(public alertController: AlertController) {}

  ngOnInit() {
  }

  async createAccount(){      
      const alert = await this.alertController.create({
        header: 'Conta criada com sucesso',
        message: `Logue-se no aplicativo usando seu e-mail e senha`,
        buttons: [{
          text: 'OK'
        }]
      });
      console.log("got here");
      await alert.present();
    
    }
  }


