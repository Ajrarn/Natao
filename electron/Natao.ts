import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

export default class Natao {

  mainWindow: BrowserWindow;
  application = app;


  onWindowAllClosed() {
    return () => {
      // j'ai commenté l'exception sur MacOS, mais le mieux serait de réouvrir l'application
      // si réactivation
      // if (process.platform !== 'darwin') {
        this.application.quit();
      // }
    };
  }

  onClose() {
      // Dereference the window object.
      this.mainWindow = null;
  }

  onReady() {
    return () => {
      this.mainWindow = new BrowserWindow({ width: 1366, height: 768 });
      this.mainWindow
        .loadURL(url.format({
          pathname: path.join(__dirname, `./Natao/index.html`),
          protocol: 'file:',
          slashes: true
        }));
      this.mainWindow.on('closed', this.onClose);
    };
  }

  start() {
    this.application.on('window-all-closed', this.onWindowAllClosed());
    this.application.on('ready', this.onReady());
  }
}
