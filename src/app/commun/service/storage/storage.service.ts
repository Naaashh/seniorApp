import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Application} from '../../../application/application.model';
import {BehaviorSubject} from 'rxjs';
import {State} from '../../model/state.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public state: State;
  private currentState = new BehaviorSubject<State>({applications: [], zoom: 0});
  public currentState$ = this.currentState.asObservable();

  constructor(private electronService: ElectronService) { }

  /**
   * get actual app stored in data file has {@link State}
   */
  async getData(): Promise<State> {
    this.electronService.ipcRenderer.send('get-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('get-data', (event, message: State) => {
      this.state = message;
      this.currentState.next(this.state);
      resolve(this.state);
    }));
  }

  /**
   * Add {@link Application} stored in data file has {@link State}
   * @param application Application to add
   */
  add(application: Application): void {
    this.state.applications = [...this.state.applications, application];
    this.modifyAndUpdateState();
  }

  /**
   * Add an image to images folder
   * @param image image data with name
   */
  addImage(image: {image: string, name: string}): void {
    this.electronService.ipcRenderer.send('add-image', image);
  }

  /**
   * edit {@link Application} stored in data file has {@link State}
   * @param application Application to edit
   */
  edit(application: Application): void {
    this.state.applications[this.state.applications.findIndex(app => app.id === application.id)] = application;
    this.modifyAndUpdateState();
  }

  /**
   * edit zoom value stored in data file has {@link State}
   * @param zoom zoom value to update
   */
  editZoom(zoom: number): void {
    this.state.zoom = zoom;
    this.modifyAndUpdateState();
  }

  /**
   * remove requested {@link Application} stored in data file has {@link State}
   * @param id application id to remove
   */
  remove(id: string): void {
    const indexOfAppToRemove: number = this.state.applications.findIndex(application => application.id === id);

    if ( indexOfAppToRemove !== -1) {
      this.state.applications.splice(indexOfAppToRemove, 1);
      this.modifyAndUpdateState();
    }
  }

  /**
   * reset current app {@link State} in data file from a default file
   */
  async reset(): Promise<State> {
    this.electronService.ipcRenderer.send('reset-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('reset-data', (event, data) => {
      this.state = data;
      this.currentState.next(this.state);
      resolve(this.state);
    }));
  }

  /**
   * send currentApplications to modification and update current app {@link State}
   */
  modifyAndUpdateState(): void {
    this.electronService.ipcRenderer.send('modify-data', this.state);
    this.currentState.next(this.state);
  }
}
