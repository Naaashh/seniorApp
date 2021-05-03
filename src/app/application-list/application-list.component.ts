import {Component, OnInit} from '@angular/core';
import {StorageService} from '../commun/service/storage/storage.service';
import {Observable} from 'rxjs';
import {AddEditModalService} from '../commun/modal/add-edit/service/add-edit-modal.service';
import {State} from '../commun/model/state.model';
import {ImagesCreditModalService} from '../commun/modal/images-credit/service/images-credit-modal.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  /**
   * Actual app {@link State} as Observable
   */
  state: Observable<State>;

  constructor(private storageService: StorageService,
              public modal: AddEditModalService,
              public imagesCreditModal: ImagesCreditModalService) {
  }

  /**
   * get actual app state from {@link StorageService}
   */
  ngOnInit(): void {
  this.state = this.storageService.currentState$;
   /* this.state = of({
      applications:
        [{
          "id": "0",
          "name": "calculator",
          "image": "calculator.svg",
          "execute": "calc",
          "isProgram": true
        },
          {
            "id": "1",
            "name": "bloc note",
            "image": "notepad.svg",
            "execute": "\"C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe\"",
            "isProgram": true
          },
          {
            "id": "2",
            "name": "internet",
            "image": "wifi.svg",
            "execute": "https://www.google.fr",
            "isProgram": false
          },
          {
            "id": "3",
            "name": "carte",
            "image": "map.svg",
            "execute": "https://www.viamichelin.com/web/Routes?departure=Current%20Location&departureGps=true",
            "isProgram": false
          },
          {
            "id": "4",
            "name": "dictionnaire",
            "image": "encyclopedia.svg",
            "execute": "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal",
            "isProgram": false
          },
          {
            "id": "5",
            "name": "traducteur",
            "image": "translate.svg",
            "execute": "https://www.linguee.com/english-french",
            "isProgram": false
          },
          {
            "id": "6",
            "name": "vidéo",
            "image": "video.svg",
            "execute": "https://www.youtube.com",
            "isProgram": false
          },
          {
            "id": "7",
            "name": "shopping",
            "image": "carts.svg",
            "execute": "https://www.amazon.com",
            "isProgram": false
          }
        ],
      "zoom": 0
    }); */
  }
}
