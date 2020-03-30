import { Config } from './config';
import { app, IpcMain } from 'electron';
import * as fs from 'fs';
import IpcMainEvent = Electron.IpcMainEvent;

const APP_DIRECTORY_KEY = 'appDirectory';
const defaultPath = app.getPath('userData') + '/Natao_files';

export class FileService {

  appDirectory: string;
  fileSystem = fs;

  constructor(private config: Config, private ipc: IpcMain){

    //init appDirectory for the first time
    if (!this.config.hasConfig(APP_DIRECTORY_KEY)) {
      this.config.setConfig(APP_DIRECTORY_KEY, defaultPath);

      try {
        if (!fs.existsSync(defaultPath)) {
          this.fileSystem.mkdirSync(defaultPath);
        }
      }
      catch(error){
        console.error(error);
      }
    }

    // get the current appDirectory
    this.appDirectory = this.config.getConfig(APP_DIRECTORY_KEY);


    // register the ipc channels
    this.ipc.handle('mkDir', async (event, someArgument) => {
      return this.mkDir(someArgument);
    });
  }

  mkDir(dirname: string): Promise<any> {
    const dir = defaultPath + '/' + dirname;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.mkdir(dir, function(error) {
        if (error) reject(error)
        else resolve();
      })
    });
  }
}
