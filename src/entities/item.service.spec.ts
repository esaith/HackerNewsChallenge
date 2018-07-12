import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
 
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ItemService } from './item.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Dictionary } from '../shared/dictionary';
import { Item } from './item';

describe('ItemService', () => { 
    let itemService: ItemService;
    let http: HttpClient;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, HttpClientModule],
            providers: [ItemService, HttpClient,
                { provide: APP_BASE_HREF, useValue: '/' },
            ]
        }).compileComponents()
            .then(inject([ItemService], (_itemService: ItemService) =>{
                itemService = _itemService;
            }));
    }));

    beforeEach(function(){
        itemService.items = new Dictionary<Item>();
    })

    //it('', async(() => { }))

    it('should have an empty item dictionary. Should call API and grab first n number of items', inject([HttpClient], (http: HttpClient) => { 
        spyOn(http, 'get').and.returnValue(Observable.of(1));
        
        itemService.getCategoryItems('1').subscribe( x => x);

        expect(http.get).toHaveBeenCalled();

    }));

});