import { Component } from '@angular/core';
import { ApiElectronService } from "./shared/services/api-electron.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Natao';

  constructor(public apiElectron: ApiElectronService) {

    if (this.apiElectron.isElectron) {
      let pong: string = this.apiElectron.sendSync('ping');
      console.log('pong', pong);

      //config
      const appDirectory = this.apiElectron.sendSync('getConfig', 'appDirectory');
      console.log('appDirectory', appDirectory);

      //test mkDir
      this.apiElectron.invoke('mkDir', 'toto').then(() => {
        console.log('dossier créé');
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
