import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObjectService } from '../services/object.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-objectDetails',
  templateUrl: './objectDetails.page.html',
  styleUrls: ['./objectDetails.page.scss'],
})
export class ObjectDetailsPage implements OnInit {

  private objectId: string = null;
  public object: Object = {};
  private objectSubscription: Subscription;

  constructor(
    private objectService: ObjectService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.objectId = this.activatedRoute.snapshot.params['id'];

    if (this.objectId) this.loadObject();
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

}
