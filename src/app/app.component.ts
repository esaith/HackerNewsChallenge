import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Story } from '../entities/story';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stories: Array<Story> = new Array<Story>();
  activeIndex: number = -1;
  story: Story;
  searchText: string = '';
  filteredStories = Array<Story>();

  ngOnInit() {
    // let story = new Story();
    // story.id = 1;
    // story.title = 'WebKitGTK+ 2.12';
    // story.by = "Planet GNOME";
    // story.time = new Date().getUTCDate();
    // story.text = "We did it again, the Igalia WebKit team is pleased to announce a new stable release of WebkitGTK+, with a bunch of bugs fixed, some new API bits and mananged to powerup";

    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);
    // this.stories.push(story);

    this.onSearchChange();
  }

  setIndexOfStory(index: number) {
    if (index >= 0 && index < this.stories.length) {
      this.activeIndex = index;
      this.story = this.stories[index];
    }
  }

  onSearchChange() {
    if (!this.searchText) {
      this.filteredStories = this.stories;
    } else {
      let search = this.searchText.toLowerCase();

      this.filteredStories = this.stories.filter(story => {
        return story.title.toLowerCase().indexOf(search) > -1 ||
          story.lowerCaseText.indexOf(search) > -1 ||
          story.id.toString() == search;
      });
    }
  }
}

