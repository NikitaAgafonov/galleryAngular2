var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { galleryService } from './gallery.service';
let GalleryComponent = class GalleryComponent {
    constructor(_img) {
        this._img = _img;
        this.images = [];
        this.scrollImg = 12;
        this.needMoreImg = true;
        this.haveNext = true;
        this.havePrev = true;
        this.needGoTop = false;
        _img.getImg().then((data) => {
            this.allImg = data;
            for (let i = 0; i < this.scrollImg; i++)
                this.images.push(this.allImg[i]);
            for (let i = 0; i < this.scrollImg; i++)
                this.allImg.shift();
        });
    }
    ngOnInit() {
        window.addEventListener('scroll', () => {
            (document.body.scrollTop > 400) ? this.needGoTop = true : this.needGoTop = false;
            if (window.screen.height + document.body.scrollTop > document.body.clientHeight)
                if (this.needMoreImg)
                    this.addImgInPage();
        });
    }
    addImgInPage() {
        let j = (this.allImg.length < this.scrollImg) ? this.allImg.length : this.scrollImg;
        for (let i = 0; i < j; i++)
            this.images.push(this.allImg[i]);
        for (let i = 0; i < j; i++)
            this.allImg.shift();
        if (this.allImg.length === 0)
            this.needMoreImg = false;
    }
    selectPhoto(index) {
        (index === 0) ? this.havePrev = false : this.havePrev = true;
        (index + 1 === this.images.length) ? this.haveNext = false : this.haveNext = true;
        this.watching = true;
        this.watchingId = index;
        this.selectedImg = this.images[index];
    }
    onPrev() {
        if (!this.haveNext)
            this.haveNext = true;
        if (this.watchingId !== 0) {
            this.watchingId--;
            this.selectedImg = this.images[this.watchingId];
            (this.watchingId === 0) ? this.havePrev = false : this.havePrev = true;
        }
    }
    onNext() {
        if (!this.havePrev)
            this.havePrev = true;
        if (this.images.length - 1 !== this.watchingId) {
            this.watchingId++;
            this.selectedImg = this.images[this.watchingId];
            if (this.watchingId === this.images.length - 1)
                this.haveNext = false;
        }
    }
    onClose() {
        this.watching = false;
        this.selectedImg = {};
    }
    goTop() {
        window.scrollTo(0, 0);
    }
};
GalleryComponent = __decorate([
    Component({
        selector: 'Gallery',
        providers: [galleryService],
        template: `
        <div class="title">
                Gallery
        </div>
        <div class="container">
            <div class="gallery">
                <img *ngFor="let img of images; let i = index" src="{{img.img.M.href}}" (click)="selectPhoto(i)" class="thumbnail"/>
            </div>
        </div>
        <popup 
            *ngIf="watching" 
            [img]="selectedImg" 
            [haveNext]="haveNext"
            [havePrev]="havePrev"
            (onClose)="onClose()"
            (onPrev)="onPrev()"
            (onNext)="onNext()"
            >
        </popup>
        <img *ngIf="needGoTop" (click)="goTop()" class="goTop" src="./img/up.png"/>
        <img *ngIf="needMoreImg" id="load" src="./img/loading.gif" width="50px" height="50px" alt="" />
    `
    }),
    __metadata("design:paramtypes", [galleryService])
], GalleryComponent);
export { GalleryComponent };
//# sourceMappingURL=gallery.component.js.map