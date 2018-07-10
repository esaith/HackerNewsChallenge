import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Story } from '../entities/story';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
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

    app.stories = [];

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel.left .story').length).toBe(0);
  }));

  it('should show the one story within the story array', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;

    app.stories.push(story);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel.left .story').length).toBe(1);
    expect(compiled.querySelectorAll('.panel.right .story').length).toBe(0);
  }));

  it('should highlight story if story has been selected', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;

    app.stories.push(story);

    let storyIndex = 0;
    app.setIndexOfStory(storyIndex);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let firstStory = compiled.querySelector('.content').firstElementChild;

    expect(firstStory.classList.contains('active')).toBe(true);
  }));

  it('should highlight second story after selection, first story should not be selected', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;

    app.stories.push(story);

    story = new Story();
    story.id = 2;
    app.stories.push(story);

    let storyIndex = 1;
    app.setIndexOfStory(storyIndex);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let firstStory = compiled.querySelector('.content').firstElementChild;
    let secondStory = firstStory.nextSibling;

    expect(firstStory.classList.contains('active')).toBe(false);
    expect(secondStory.classList.contains('active')).toBe(true);
  }));

  it('should show text content of selected item in second panel', function () {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;
    story.title = 'Hacker Story of Awesomeness';
    story.text = '<html><body>This is the body of a story</body></html>';
    app.stories.push(story);

    let storyIndex = 0;
    app.setIndexOfStory(storyIndex);

    // Act
    fixture.detectChanges();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel.right .top-bar .title').textContent).toBe("Hacker Story of Awesomeness");
    expect(compiled.querySelector('.panel.right .content .story').textContent).toBe("<html><body>This is the body of a story</body></html>");
  })

  it('should return one of two stories by title. Case INSENsitive', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;
    story.title = 'How to hack bathroom scales';
    story.by = 'shortie';

    app.stories.push(story);

    story = new Story();
    story.id = 2;
    story.title = 'How to recycle a story.'
    app.stories.push(story);

    app.searchText = "How to RECYCLE";

    // Act
    fixture.detectChanges();
    app.onSearchChange();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let stories = compiled.querySelectorAll('.panel.left .story');

    expect(stories.length).toBe(1);
  }));

  it('should return one of two stories by id. Case INSENsitive', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.stories = [];
    let story = new Story();
    story.id = 1;
    story.title = 'How to hack bathroom scales';
    story.by = 'shortie';

    app.stories.push(story);

    story = new Story();
    story.id = 2;
    story.title = 'How to recycle a story.'
    app.stories.push(story);

    app.searchText = "1";

    // Act
    fixture.detectChanges();
    app.onSearchChange();

    //Assert 
    const compiled = fixture.debugElement.nativeElement;
    let stories = compiled.querySelectorAll('.panel.left .story');

    expect(stories.length).toBe(1);
  }));

});
