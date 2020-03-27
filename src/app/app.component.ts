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
      console.log('electronService', this._electronService);
      let pong: string = this._electronService
        .ipcRenderer.sendSync('ping');
      console.log(pong);
    }

  }
}
