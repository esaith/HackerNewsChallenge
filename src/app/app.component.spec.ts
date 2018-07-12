import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Item } from '../entities/item';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../entities/item.service';
import { Observable } from 'rxjs-compat';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should not break if list is empty', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = [];

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel.left .item').length).toBe(0);
  }));

  it('should show the one item within the item array', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1,
      title: 'How does Bunyan hack away so much?',
      by: 'Babe'
    }));

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel.left .item').length).toBe(1);
    expect(compiled.querySelectorAll('.panel.right .item').length).toBe(0);
  }));

  it('should highlight item if item has been selected', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1
    }));

    // Act
    let storyIndex = 0;
    app.setIndexOfStory(storyIndex);
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let firstStory = compiled.querySelector('.panel.left .content').firstElementChild;

    expect(firstStory.classList.contains('active')).toBe(true);
  }));

  it('should highlight second item after selection, first item should not be selected', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1
    }));

    app.items.push(Object.assign(new Item(), {
      id: 2
    }));

    let storyIndex = 1;
    app.setIndexOfStory(storyIndex);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let firstStory = compiled.querySelector('.panel.left .content').firstElementChild;
    let secondStory = firstStory.nextSibling;

    expect(firstStory.classList.contains('active')).toBe(false);
    expect(secondStory.classList.contains('active')).toBe(true);
  }));

  it('should show text content of selected item in second panel', function () {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1,
      title: 'Hacker Item of Awesomeness',
      text: '<html><body>This is the body of a item</body></html>'
    }));

    let storyIndex = 0;
    app.setIndexOfStory(storyIndex);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel.right .top-bar .title').textContent).toBe("Hacker Item of Awesomeness");
    expect(compiled.querySelector('.panel.right .content .item').textContent).toBe("<html><body>This is the body of a item</body></html>");
  })

  it('should return one of two items by title. Case INSENsitive', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1,
      title: 'HOw to hack the bathroom scale',
      by: 'shortie'
    }));

    app.items.push(Object.assign(new Item(), {
      id: 2,
      title: 'How to hack cracker jacks',
    }));

    app.searchText = "CRACKER jACks";

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let items = compiled.querySelectorAll('.panel.left .item');

    expect(items.length).toBe(1);
  }));

  it('should return one of two items by id. Case INSENsitive', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.items = Array<Item>();
    app.items.push(Object.assign(new Item(), {
      id: 1,
      title: 'How to hack bathroom scales',
      by: 'shortie'
    }));

    app.items.push(Object.assign(new Item(), {
      id: 2,
      title: 'How to hack a recycling bin',
      by: 'Grouch'
    }));

    app.searchText = "1";

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let items = compiled.querySelectorAll('.panel.left .item');

    expect(items.length).toBe(1);
  }));

  it('should call the item service after selecting a new category', inject([ItemService], (itemService: ItemService) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    let item = Object.assign(new Item(), {
      id: 2,
      title: 'How the Grinch hacked Christmas',
      by: 'Grouch'
    });

    spyOn(itemService, 'getCategoryItems').and.returnValue(Observable.of([item]));

    // Act
    fixture.detectChanges();
    app.getSelectedCategoryItems(0); // Absolute newest

    expect(item.title).toBe(app.items[0].title);
    expect(item.id).toBe(app.items[0].id);
    expect(item.by).toBe(app.items[0].by);
    expect(itemService.getCategoryItems).toHaveBeenCalled();
  }));

});
