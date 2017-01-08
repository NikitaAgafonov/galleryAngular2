var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
let PopupComponent = class PopupComponent {
    constructor() {
        this.onClose = new EventEmitter();
        this.onNext = new EventEmitter();
        this.onPrev = new EventEmitter();
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 37)
                this.prev();
            if (event.keyCode === 39)
                this.next();
        });
    }
    ngOnInit() {
        this.loadedImg = false;
        this.srcImg = './img/loading.gif';
        let imgLoad = document.createElement('img');
        imgLoad.src = this.img.img.XL.href;
        imgLoad.onload = () => {
            this.srcImg = this.img.img.XL.href;
            this.loadedImg = true;
        };
    }
    next() {
        if (this.haveNext)
            Promise
                .resolve(this.onNext.emit())
                .then(() => this.ngOnInit());
    }
    prev() {
        if (this.havePrev)
            Promise
                .resolve(this.onPrev.emit())
                .then(() => this.ngOnInit());
    }
    close(event) {
        if (event.target.className === 'popup' || event.target.className === 'popup__content_closeImg')
            this.onClose.emit();
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "onClose", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "onNext", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "onPrev", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "img", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PopupComponent.prototype, "haveNext", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PopupComponent.prototype, "havePrev", void 0);
PopupComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [])
], PopupComponent);
export { PopupComponent };
//# sourceMappingURL=popup.component.js.map