import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { Config } from './config';
import { FileService } from './file-service';

export default class Natao {

  mainWindow: BrowserWindow;
  application = app;
  ipc = ipcMain;

  config: Config;
  fileService: FileService


  onWindowAllClosed() {
    if (this.fileService) {
      this.fileService.quitProperly();
    } else {
      this.application.quit();
    }
  }

  onClose() {
    // Dereference the window object.
    this.mainWindow = null;
  }

  onReady() {

    /* TODO: activer pour version production
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
       callback({
             responseHeaders: {
             ...details.responseHeaders,
             'Content-Security-Policy': ['default-src \'none\'']
             }
      });
     });*/

    // property deprecated but set by default at true
    // to avoid future bug
    app.allowRendererProcessReuse = false;


    this.mainWindow = new BrowserWindow({
      width: 1366,
      height: 768,
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
    // TODO: désactiver pour version de production
    this.mainWindow.webContents.openDevTools();

    // close app
    this.mainWindow.on('closed', this.onClose);
  }

  start() {
    // instance of configuration service
    this.config = new Config(this.ipc);

    //instance of file service
    this.fileService = new FileService(this.config, this.ipc);

    // listener app
    this.application.on('window-all-closed', () => {
      this.onWindowAllClosed()
    });
    this.application.on('ready', () => {
      this.onReady()
    });
  }
}
