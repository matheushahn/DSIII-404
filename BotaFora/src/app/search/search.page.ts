import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/Category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  categories: Observable<Array<Category>>;
  searchFormGroup: FormGroup;

  constructor(
      private categoryService: CategoryService,
      formBuilder: FormBuilder
  ) {
      this.searchFormGroup = formBuilder.group({
      searchTerm: [""],
      state: [""],
      city: [""],
      category: [""]
    });
      this.categories = this.categoryService.getCategories();
   }

  ngOnInit() {
  }

}
