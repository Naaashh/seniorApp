import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Application} from '../../../application/application.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public show = false;
  private showBehavior = new BehaviorSubject<boolean>(this.show);
  public show$: Observable<boolean> = this.showBehavior.asObservable();

  public value$: Observable<Application>;

  openModal(application: Application = {id: null, execute: null, image: null, isProgram: false, name: null}): void {
    this.value$ = of(application);
    this.show = true;
    this.showBehavior.next(this.show);
  }

  closeModal(): void {
    this.show = false;
    this.showBehavior.next(this.show);
  }
}
