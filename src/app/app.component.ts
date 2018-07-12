import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Item } from '../entities/item';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Category } from '../entities/category';
import { ItemService } from '../entities/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categoryIndex: number;
  items: Array<Item> = new Array<Item>();
  itemIndex: number = -1;
  item: Item;
  searchText: string;
  filteredStories = Array<Item>();
  categories: Array<Category>;
  
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.createCategoryList();
    this.onSearchChange();
  }

  createCategoryList() {
    this.categories = new Array<Category>();
    this.categories.push(Object.assign(new Category(), {name: "Absolute Newest", tag: "not necessarily the coolest", id: "maxitem"}));
    this.categories.push(Object.assign(new Category(), {name: "Top Stories", tag: "hot off the feed", id: "topstories"}));
    this.categories.push(Object.assign(new Category(), {name: "News", tag: "don't let the zombie apocolypse pass you by", id: "newstories"}));
    this.categories.push(Object.assign(new Category(), {name: "Best Stories", tag: "but not the last story", id: "beststories"}));
    this.categories.push(Object.assign(new Category(), {name: "Ask?", tag: "is jeeves still around?",  id: "askstories"}));
    this.categories.push(Object.assign(new Category(), {name: "Show", tag: "and tell", id: "showstories"}));
    this.categories.push(Object.assign(new Category(), {name: "Job", tag: "home away from home stories", id: "jobstories"}));
  }

  setIndexOfStory(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.itemIndex = index;
      this.item = this.items[index];
    }
  }

  onSearchChange() {
    if (!this.searchText) {
      this.filteredStories = this.items;
    } else {
      let search = this.searchText.toLowerCase();

      this.filteredStories = this.items.filter(item => {
        return item.title.toLowerCase().indexOf(search) > -1 ||
          item.lowerCaseText.indexOf(search) > -1 ||
          item.id.toString() == search;
      });
    }
  }

  getSelectedCategoryItems(index: number) {
    this.categoryIndex = index;

    this.itemService.getCategoryItems(this.categories[index].id).subscribe(items => {
      this.items = items;
      this.onSearchChange();
    });
  }
}

