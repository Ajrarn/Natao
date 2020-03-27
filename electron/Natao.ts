import {app, BrowserWindow, ipcMain, session} from 'electron';
import * as path from 'path';
import * as url from 'url';

export default class Natao {

  mainWindow: BrowserWindow;
  application = app;
  ipc = ipcMain;


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

      /*session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({ responseHeaders: Object.assign({
            'Content-Security-Policy': [ "default-src 'self'" ]
          }, details.responseHeaders)});
      });*/


      this.mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
          nodeIntegration: true
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
    };
  }

  start() {
    this.application.on('window-all-closed', this.onWindowAllClosed());
    this.application.on('ready', this.onReady());

    this.ipc.on('ping', (event, arg) => {
      event.returnValue = 'ping-pong';
    });
  }
}
