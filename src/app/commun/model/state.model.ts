import {Application} from '../../application/application.model';

/**
 * current app State
 */
export interface State {
  applications: Array<Application>;
  zoom: number;
}
