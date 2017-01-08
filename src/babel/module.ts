import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { JsonpModule }        from '@angular/http';
import { GalleryComponent }   from './gallery.component';
import { PopupComponent }     from './popup.component';

@NgModule({
    imports:      [ BrowserModule,JsonpModule ],
    declarations: [ GalleryComponent,PopupComponent ],
    bootstrap:    [ GalleryComponent ]
})
export class AppModule { }