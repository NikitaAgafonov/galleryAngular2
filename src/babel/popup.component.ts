import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({

    selector: 'popup',

    template: `
        <div class="popup" (click)="close($event)">
            <div class="popup__content">
                <div class="popup__content_header">
                    <div class="popup__content_name">
                        {{img.title}}
                    </div>
                    <div class="popup__content_close">
                        <!--<span class="glyphicon glyphicon-remove-sign"></span>-->
                        <img src="./img/close.png" class="popup__content_closeImg" alt="" />
                    </div>
                </div>
                <div class="popup__content_image">
                    <img class="left" [class.hidden]="!havePrev" src="./img/left_popup.png" (click)="prev()" />
                    <div class="center" >
                        <img [class.thumbnail]="loadedImg" (click)="next()" src="{{srcImg}}" />
                    </div>
                    <img class="right" [class.hidden]="!haveNext" src="./img/right_popup.png"  (click)="next()" />
                </div>
                <div class="popup__content_footer">
                    Author: {{img.author}}
                </div>
            </div>
        </div>
    `,
})
export class PopupComponent implements OnInit {


    @Output() onClose = new EventEmitter<boolean>();
    @Output() onNext = new EventEmitter<boolean>();
    @Output() onPrev = new EventEmitter<boolean>();


    @Input() img: {};
    @Input() haveNext: boolean;
    @Input() havePrev: boolean;


    private srcImg: any;
    private loadedImg: boolean;

    constructor() {

        window.addEventListener('keydown',(event) => {

            if (event.keyCode===37) this.prev();

            if (event.keyCode===39) this.next();

        });

    }

    ngOnInit () {

        this.loadedImg = false;
        this.srcImg = './img/loading.gif';


        let imgLoad = document.createElement('img');

        imgLoad.src = this.img.img.XL.href;

        imgLoad.onload = () => {

            this.srcImg = this.img.img.XL.href;
            this.loadedImg = true;

        }

    }

    next() {

        if(this.haveNext)
            Promise
                .resolve(this.onNext.emit())
                .then(() => this.ngOnInit());

    }

    prev() {

        if(this.havePrev)
            Promise
                .resolve(this.onPrev.emit())
                .then(() => this.ngOnInit());

    }

    close(event:any) {

        if (event.target.className==='popup' || event.target.className==='popup__content_closeImg')
            this.onClose.emit();

    }

}