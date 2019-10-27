import { Component, OnInit } from '@angular/core';
import { ObjectService } from 'src/app/services/object.service';
import { AuthenticationService} from '../services/authentication.service';
import { Object } from 'src/app/interfaces/Object';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-myObjects',
  templateUrl: './myObjects.page.html',
  styleUrls: ['./myObjects.page.scss'],
})
export class MyObjectsPage implements OnInit {
  objects: Observable<Object[]>;

  constructor(
    private objectService: ObjectService,
    private authenticationService: AuthenticationService,
    public modalController: ModalController
    ) {
    this.objects = this.objectService.getObjects();
  }

  ngOnInit() { 
  }

  ngOnDestroy() { }

  getCurrentUserId() {
    if(this.authenticationService.getAuth().currentUser)
      return this.authenticationService.getAuth().currentUser.uid;
    return null;
  }

  showObject(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }
}
