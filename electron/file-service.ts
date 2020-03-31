import { Config } from './config';
import { app, IpcMain } from 'electron';
import * as fs from 'fs';
import { Subject } from 'rxjs';

const APP_DIRECTORY_KEY = 'appDirectory';
const defaultPath = app.getPath('userData') + '/Natao_files';

export class FileService {

  appDirectory: string;
  fileSystem = fs;

  $fileEvents: Subject<string>;
  pendingWrites = 0;
  quitAsked = false;

  constructor(private config: Config, private ipc: IpcMain){

    this.$fileEvents = new Subject();

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
    this.ipc.handle('mkDir', async (event, dirName) => {
      return this.mkDir(dirName);
    });

    this.ipc.handle('readdir', async (event, dirName) => {
      return this.readdir(dirName);
    });

    this.ipc.handle('rmdir', async (event, dirName) => {
      return this.rmdir(dirName);
    });

    this.ipc.handle('readFile', async (event, filename) => {
      return this.readFile(filename);
    });

    this.ipc.handle('writeFile', async (event, filename, data) => {
      return this.writeFile(filename, data);
    });

    this.ipc.handle('unlink', async (event, dirName) => {
      return this.unlink(dirName);
    });

    this.ipc.handle('rename', async (event, oldName, newName) => {
      return this.rename(oldName, newName);
    });

    // start observation of file events to quit properly
    this.$fileEvents.subscribe((event) => {
      switch (event) {
        case 'startWrite': this.pendingWrites++;
          break;
        case 'endWrite': this.pendingWrites--;
          break;
        case 'quit': this.quitAsked = true;
          break;
        default: break;
      }

      if (this.quitAsked && this.pendingWrites === 0) {
        app.quit();
      }
    });

  }

  // ****** directory manipulations *********//

  readdir(dirName: string): Promise<any> {
    const fullName = defaultPath + '/' + dirName;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.readdir(fullName, function(error, data) {
        if (error) reject(error)
        else resolve(data);
      })
    });
  }

  mkDir(dirname: string): Promise<any> {

    this.$fileEvents.next('startWrite');

    const dir = defaultPath + '/' + dirname;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.mkdir(dir, function(error) {
        if (error) reject(error)
        else resolve();
        that.$fileEvents.next('endWrite');
      })
    });
  }

  rmdir(filename: string): Promise<any> {
    this.$fileEvents.next('startWrite');

    const fullName = defaultPath + '/' + filename;

    const that = this;

    return new Promise(function (resolve, reject) {
      that.fileSystem.rmdir(fullName, function (error) {
        if (error) reject(error)
        else resolve();
        that.$fileEvents.next('endWrite');
      })
    });
  }

  // ****** file manipulations *********//

  readFile(filename: string): Promise<any> {
    const fullName = defaultPath + '/' + filename;

    const that = this;

    return new Promise(function (resolve, reject) {
      that.fileSystem.readFile(fullName, 'utf8',function (error, data) {
        if (error) reject(error)
        else resolve(data);
      })
    });
  }

  writeFile(filename: string, data: any): Promise<any> {
    this.$fileEvents.next('startWrite');
    const fullName = defaultPath + '/' + filename;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.writeFile(fullName, data, function(error) {
        if (error) reject(error)
        else resolve();
        that.$fileEvents.next('endWrite');
      })
    });
  }

  unlink(filename: string): Promise<any> {
    this.$fileEvents.next('startWrite');
    const fullName = defaultPath + '/' + filename;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.unlink(fullName, function(error) {
        if (error) reject(error)
        else resolve();
        that.$fileEvents.next('endWrite');
      })
    });
  }

  rename(oldName: string, newName: string): Promise<any> {
    this.$fileEvents.next('startWrite');
    const oldFullName = defaultPath + '/' + oldName;
    const newFullName = defaultPath + '/' + newName;

    const that = this;

    return new Promise(function(resolve, reject) {
      that.fileSystem.rename(oldFullName, newFullName, function(error) {
        if (error) reject(error)
        else resolve();
        that.$fileEvents.next('endWrite');
      })
    });
  }

  quitProperly() {
    this.$fileEvents.next('quit');
  }
}
