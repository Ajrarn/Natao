import { Component } from '@angular/core';
import { ElectronService } from "ngx-electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Natao';
  isElectron = false;

  constructor(private _electronService: ElectronService) {
    this.isElectron = this._electronService.isElectronApp;

    if (this.isElectron) {
      let pong: string = this._electronService
        .ipcRenderer.sendSync('ping');
      console.log(pong);


      //config
      this._electronService.ipcRenderer.sendSync('setConfig', 'appDirectory', 'myDirectory');
      const appDirectory = this._electronService.ipcRenderer.sendSync('getConfig', 'appDirectory');
      console.log('appDirectory', appDirectory);

      // pour voir le path où le fichier de config est enregistré
      console.log('path', this._electronService.ipcRenderer.sendSync('getPath'));
    }

  }
}
