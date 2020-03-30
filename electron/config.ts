import * as ElectronStore from 'electron-store';
import { IpcMain } from 'electron';


export class Config {
  store = new ElectronStore({name: 'NataoConfig'});

  constructor(private ipc: IpcMain) {

    // register the ipc channels
    this.ipc.on('getConfig',(event, key) => {
        event.returnValue = this.getConfig(key);
    });

    this.ipc.on('setConfig',(event, key: string, value: any) => {
      event.returnValue = this.setConfig(key, value);
    });

  }

  getConfig(key: string): any {
      return this.store.get(key);
  }


  setConfig(key: string, value: any): void {
      this.store.set(key, value);
  }

  hasConfig(key: string) {
    return this.store.has(key);
  }

}
