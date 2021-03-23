import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ImageCredit} from 'src/app/commun/model/imageCredit';

@Injectable({
  providedIn: 'root'
})
export class ImagesCreditModalService {

  public show = false;
  private showBehavior = new BehaviorSubject<boolean>(this.show);
  public show$: Observable<boolean> = this.showBehavior.asObservable();

  public value$: Observable<Array<ImageCredit>>;

  /**
   * open {@link ImagesCreditComponent}
   * @see {@link ImageCredit} for image credit
   */
  openModal(): void {
    this.show = true;
    this.showBehavior.next(this.show);
  }

  /**
   * open {@link ImagesCreditComponent}
   */
  closeModal(): void {
    this.show = false;
    this.showBehavior.next(this.show);
  }
}
