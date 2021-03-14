import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private currentlyEdit = false;
  private editState = new BehaviorSubject<boolean>(this.currentlyEdit);
  public edit = this.editState.asObservable();

  /**
   * set edit mode
   */
  setEditMode(): void {

    if (this.currentlyEdit) {
      this.editState.next(false);
    } else {
      this.editState.next(true);
    }
    this.currentlyEdit = !this.currentlyEdit;
  }
}
