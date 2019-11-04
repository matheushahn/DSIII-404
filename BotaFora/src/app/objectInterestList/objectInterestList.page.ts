import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
//import { AuthenticationService} from '../services/authentication.service';
import { RegisterCredential } from 'src/app/interfaces/RegisterCredential';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bjectInterestList',
  templateUrl: './objectInterestList.page.html',
  styleUrls: ['./objectInterestList.page.scss'],
})
export class ObjectInterestListPage implements OnInit {
  users: Observable<User[]>;

  constructor(
    private userService: UserService,
    //private authenticationService: AuthenticationService,
    public modalController: ModalController
    ) {
    this.users = this.userService.getUsers();
  }

  ngOnInit() { 
  }

  ngOnDestroy() { }

  /*getCurrentUserId() {
    if(this.authenticationService.getAuth().currentUser)
      return this.authenticationService.getAuth().currentUser.uid;
    return null;
  }

  showObject(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }*/
}
