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
        itemService.itemIds = new Dictionary<number[]>();
    })

    it('should have an empty itemIds dictionary. Should call API and grab first n number of items', inject([HttpClient], (http: HttpClient) => { 
        spyOn(http, 'get').and.returnValues(Observable.of(1));
        
        itemService.getCategoryItems('1').subscribe();
        expect(http.get).toHaveBeenCalled();
    }));
    
    xit('Should retrieve from itemIds dictionary if value is already cached. Should still call api for individual items', inject([HttpClient], (http: HttpClient) => { 
        itemService.itemIds.add('2', [1]);
        
        spyOn(http, 'get').and.returnValue(Observable.of(new Item()));
        spyOn<any>(itemService, 'getItemsFromCategory');

        itemService.getCategoryItems('2').subscribe();
        expect(http.get).toHaveBeenCalled();
        expect(itemService.getItemsFromCategory).not.toHaveBeenCalled();
    }));

});