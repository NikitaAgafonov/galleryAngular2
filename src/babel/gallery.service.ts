import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class galleryService {

    private url: string = 'https://api-fotki.yandex.ru/api/top/?format=json&callback=JSONP_CALLBACK';

    constructor(private _jsonp: Jsonp) {  }

    getImg() {

        return this._jsonp

            .request(this.url, {method: 'Get'})

            .map(

                data => data._body.entries

            )

            .toPromise();

    }
}