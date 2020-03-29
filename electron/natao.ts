import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { Config } from './config';
import IpcMainEvent = Electron.IpcMainEvent;

export default class Natao {

  mainWindow: BrowserWindow;
  application = app;
  ipc = ipcMain;

  config: Config;


  onWindowAllClosed() {
      // j'ai commenté l'exception sur MacOS, mais le mieux serait de réouvrir l'application
      // si réactivation
      // if (process.platform !== 'darwin') {
        this.application.quit();
      // }
  }

  onClose() {
      // Dereference the window object.
      this.mainWindow = null;
  }

  onReady() {
      /*session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({ responseHeaders: Object.assign({
            'Content-Security-Policy': [ "default-src 'self'" ]
          }, details.responseHeaders)});
      });*/


      this.mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        /*webPreferences: {
          nodeIntegration: true
        }*/
        webPreferences: {
          nodeIntegration: false, // is default value after Electron v5
          contextIsolation: true, // protect against prototype pollution
          enableRemoteModule: false, // turn off remote
          preload: path.join(app.getAppPath(), 'preload.js')
        }
      });
      this.mainWindow
        .loadURL(url.format({
          pathname: path.join(__dirname, `./Natao/index.html`),
          protocol: 'file:',
          slashes: true
        }));

      // les devtools
      this.mainWindow.webContents.openDevTools();

      this.mainWindow.on('closed', this.onClose);
  }

  start() {
    // instance of configuration service
    this.config = new Config(this.ipc);

    this.application.on('window-all-closed', () => {
      this.onWindowAllClosed()
    });
    this.application.on('ready', () => {
      this.onReady()
    });

    this.ipc.on('ping', (event, arg) => {
      console.log('ping');
      event.returnValue = 'ping-pong';
    });

    // pour voir le path où le fichier de config est enregistré
    this.ipc.on('getPath', (event, arg) => {
      event.returnValue =  app.getPath('userData');
    })
  }
}
