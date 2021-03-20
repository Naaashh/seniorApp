import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  public parameterShow = false;
  private parameterState = new BehaviorSubject<boolean>(this.parameterShow);
  public parameters = this.parameterState.asObservable();

  /**
   * show or hide {@link ParametersComponent}
   */
  changeParamMode(): void {
    this.parameterShow = !this.parameterShow;
    this.parameterState.next(this.parameterShow);
  }
}
