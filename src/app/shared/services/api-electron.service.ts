import { Injectable } from '@angular/core';

export interface WindowApi {
  api: any;
};

@Injectable({
  providedIn: 'root'
})
export class ApiElectronService {

  api: {
    sendSync: (channel: string, ...args: any[]) => any,
    receive: () => {}
  };

  constructor() {
    this.api = (window as unknown as WindowApi).api;
  }

  sendSync(channel: string, ...args: any[]): any {
    return this.api.sendSync(channel, ...args);
  }

  get isElectron(): boolean {
    return !!this.api;
  }
}
