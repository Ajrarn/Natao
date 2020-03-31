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
    invoke: (channel: string, ...args: any[]) => Promise<any>
  };

  constructor() {
    this.api = (window as unknown as WindowApi).api;
  }

  sendSync(channel: string, ...args: any[]): any {
    return this.api.sendSync(channel, ...args);
  }

  invoke(channel: string, ...args: any[]): Promise<any> {
    return this.api.invoke(channel, ...args);
  }

  get isElectron(): boolean {
    return !!this.api;
  }
}
