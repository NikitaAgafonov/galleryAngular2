import { Component, OnInit } from '@angular/core';
import { galleryService } from './gallery.service';

@Component({
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
})
export class GalleryComponent implements OnInit {


    protected images: {}[] = [];
    protected allImg: {}[];
    protected scrollImg: number = 12;

    private needMoreImg: boolean = true;
    private watching: boolean;
    private haveNext: boolean = true;
    private havePrev: boolean = true;
    private needGoTop: boolean = false;
    private watchingId: number;

    public selectedImg: {};


    constructor(private _img:galleryService) {

        _img.getImg().then((data) =>  {

            this.allImg = data;

            for (let i = 0; i < this.scrollImg; i++)
                this.images.push(this.allImg[i]);

            for (let i = 0; i < this.scrollImg; i++)
                this.allImg.shift();

        });


    }

    ngOnInit() {

        window.addEventListener('scroll',() => {

            (document.body.scrollTop > 400) ? this.needGoTop = true : this.needGoTop = false;

            if (window.screen.height + document.body.scrollTop > document.body.clientHeight)

                if (this.needMoreImg) this.addImgInPage();

        });

    }

    addImgInPage() {

        let j = (this.allImg.length < this.scrollImg) ? this.allImg.length: this.scrollImg;

        for (let i = 0; i < j; i++)
            this.images.push(this.allImg[i]);

        for (let i = 0; i < j; i++)
            this.allImg.shift();

        if (this.allImg.length===0) this.needMoreImg = false;

    }

    selectPhoto(index:number) {

        (index===0) ? this.havePrev = false: this.havePrev = true;

        (index+1===this.images.length) ? this.haveNext = false: this.haveNext = true;

        this.watching = true;
        this.watchingId = index;
        this.selectedImg = this.images[index];

    }

    onPrev () {

        if (!this.haveNext) this.haveNext = true;

        if (this.watchingId!==0) {

            this.watchingId--;
            this.selectedImg = this.images[this.watchingId];
            (this.watchingId === 0) ? this.havePrev = false : this.havePrev = true;

        }

    }

    onNext () {

        if (!this.havePrev) this.havePrev = true;

        if (this.images.length-1!==this.watchingId) {

            this.watchingId++;
            this.selectedImg = this.images[this.watchingId];
            if(this.watchingId === this.images.length-1) this.haveNext = false;

        }

    }

    onClose () {

        this.watching = false;
        this.selectedImg = {};

    }

    goTop () {

        window.scrollTo(0,0);

    }

}