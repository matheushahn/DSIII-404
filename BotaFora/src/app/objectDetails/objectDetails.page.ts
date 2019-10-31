import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ObjectService } from '../services/object.service';
import { AuthenticationService} from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Object } from '../interfaces/Object';

@Component({
  selector: 'app-objectDetails',
  templateUrl: './objectDetails.page.html',
  styleUrls: ['./objectDetails.page.scss'],
})
export class ObjectDetailsPage implements OnInit {

  private object: Observable<Object>;

  constructor(
    private objectService: ObjectService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.params['id'];
    this.object = this.objectService.getObject(id);
                    
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

  showInterestList(objectUserId) {
    return objectUserId == this.getCurrentUserId();
  }

  addInterest(){
      var userId = this.getCurrentUserId();
      var interest = {"userId" : userId, "timestamp" : new Date().getTime()};
      this.objectService.updateObjectCollection(this.activatedRoute.snapshot.params['id'], "interestList", interest);
  }
}
