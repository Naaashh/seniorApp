import {Component, OnInit} from '@angular/core';
import {StorageService} from './commun/service/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * App title
   */
  title = 'seniorApp';

  constructor(private storageService: StorageService) {
  }
  /**
   * hide startup animations
   */
  ngOnInit(): void {
    this.storageService.getData();
    this.noAnimation();
  }

  /**
   * used to hide animations on page startup
   */
  noAnimation(): void {
    window.setTimeout(_ => {
      (document.getElementsByTagName('app-parameters').item(0) as HTMLElement).style.visibility = 'visible';
    }, 500);
  }
}
