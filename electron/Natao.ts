import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

export default class Natao {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Natao.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    Natao.mainWindow = null;
  }

  private static onReady() {
    Natao.mainWindow = new Natao.BrowserWindow({ width: 1366, height: 768 });
    Natao.mainWindow
      .loadURL(url.format({
        pathname: path.join(__dirname, `./Natao/index.html`),
        protocol: 'file:',
        slashes: true
      }));
    Natao.mainWindow.on('closed', Natao.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into Natao function
    // so Natao class has no dependencies. Natao
    // makes the code easier to write tests for
    Natao.BrowserWindow = browserWindow;
    Natao.application = app;
    Natao.application.on('window-all-closed', Natao.onWindowAllClosed);
    Natao.application.on('ready', Natao.onReady);
  }
}
