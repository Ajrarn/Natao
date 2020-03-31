import { Injectable } from '@angular/core';
import { ApiElectronService } from './api-electron.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor (private apiElectron: ApiElectronService) {
  }

  // ********* directories manipulations *************

  readDirectory(dirname: string): Observable<any> {

    const $return = new Subject();

    this.apiElectron.invoke('readdir', dirname).then((data) => {
      $return.next(data);
    }).catch((error) => {
      $return.error(error)
    });

    return $return;
  }

  saveDirectory(dirname: string): Observable<any> {
    const $return = new Subject();

    this.apiElectron.invoke('mkDir', dirname).then(() => {
      $return.next('done');
    }).catch((error) => {
      $return.error(error)
    });

    return $return;
  }

  renameDirectory(oldDirname: string, newDirname): Observable<any> {
    const $return = new Subject();

    this.apiElectron.invoke('rename', oldDirname, newDirname).then(() => {
      $return.next('done');
    }).catch((error) => {
      console.error(error);
    });

    return $return;
  }

  deleteDirectory(dirname: string): Observable<any> {
    const $return = new Subject();

    this.apiElectron.invoke('rmdir', dirname).then(() => {
      $return.next('done');
    }).catch((error) => {
      $return.error(error)
    });

    return $return;
  }

  // ********** files manipulation ***************


  readFile(filename: string): Observable<any> {

    const $return = new Subject();

    this.apiElectron.invoke('readFile', filename).then((data) => {
      $return.next(data);
    }).catch((error) => {
      console.error(error);
    });

    return $return;
  }

  renameFile(oldFilename: string, newFilename) {
    const $return = new Subject();

    this.apiElectron.invoke('rename', oldFilename, newFilename).then(() => {
      $return.next('done');
    }).catch((error) => {
      console.error(error);
    });

    return $return;
  }

  saveFile(filename: string, data: any): Observable<any> {
    const $return = new Subject();

    this.apiElectron.invoke('writeFile', filename, JSON.stringify(data)).then(() => {
      $return.next('done');
    }).catch((error) => {
      console.error(error);
    });

    return $return;
  }

  deleteFile(filename: string): Observable<any> {
    const $return = new Subject();

    this.apiElectron.invoke('unlink', filename).then(() => {
      $return.next('done');
    }).catch((error) => {
      console.error(error);
    });

    return $return;
  }
}
