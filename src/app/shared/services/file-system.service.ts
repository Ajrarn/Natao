import { Injectable } from '@angular/core';
import { ApiElectronService } from './api-electron.service';
import { Observable, Subject, interval } from 'rxjs';

export enum ResourceStatus {
  AVAILABLE,
  BUSY
}

export interface ResourceJob {
  name: string;
  status: ResourceStatus,
  operations: [
    {
      instruction: Instruction,
      data: string,
      subject: Subject<any>
    }
  ];
}

export enum Instruction {
  READ_DIR = 'readdir',
  MK_DIR = 'mkDir',
  RM_DIR = 'rmdir',
  RENAME = 'rename',
  READ_FILE = 'readFile',
  WRITE_FILE = 'writeFile',
  UNLINK = 'unlink'
}

const returnDataInstructions = [ Instruction.READ_DIR, Instruction.READ_FILE];

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  resourcesJobs: ResourceJob[] = [];
  $jobWatcher = interval(500);

  // to avoid race conditions between read, write, delete on file system
  // all the fileSystems operations are queued for each resource
  // a job watcher will execute the different jobs in order, when the previous are finished

  // TODO: Think of a security when one resource is child of another

  constructor (private apiElectron: ApiElectronService) {

    this.$jobWatcher.subscribe(() => {

      this.resourcesJobs.filter(item => item.status !== ResourceStatus.BUSY)
        .forEach((item) => {

          item.status = ResourceStatus.BUSY;

          if (item.operations.length > 0) {
            const operation = item.operations.shift();

            if (returnDataInstructions.indexOf(operation.instruction) > -1) {
              // return data in subject
              this.apiElectron.invoke(operation.instruction, item.name, operation.data).then((data) => {
                operation.subject.next(data);
                item.status = ResourceStatus.AVAILABLE;
              }).catch((error) => {
                operation.subject.error(error);
                item.status = ResourceStatus.AVAILABLE;
              });

            } else {
              // return done in subject
              this.apiElectron.invoke(operation.instruction, item.name, operation.data).then(() => {
                operation.subject.next('done');
                item.status = ResourceStatus.AVAILABLE;
              }).catch((error) => {
                operation.subject.error(error);
                item.status = ResourceStatus.AVAILABLE;
              });
            }
          }
        })
    })

  }

  registerJob(name: string, instruction: Instruction, data: string): Subject<any> {
    const subject = new Subject<any>();

    const resource = this.resourcesJobs.find(item => item.name === name);

    if (resource) {
      resource.operations.push({instruction, data, subject})
    } else {
      this.resourcesJobs.push({
        name,
        status: ResourceStatus.AVAILABLE,
        operations: [{instruction, data, subject}]
      });
    }

    return subject;

  }

  // ********* directories manipulations *************

  readDirectory(dirname: string): Observable<any> {
    return this.registerJob(dirname, Instruction.READ_DIR, null);
  }

  saveDirectory(dirname: string): Observable<any> {
    return this.registerJob(dirname, Instruction.MK_DIR, null)
  }

  renameDirectory(oldDirname: string, newDirname): Observable<any> {
    return this.registerJob(oldDirname, Instruction.RENAME, newDirname);
  }

  deleteDirectory(dirname: string): Observable<any> {
    return this.registerJob(dirname, Instruction.RM_DIR, null);
  }

  // ********** files manipulation ***************


  readFile(filename: string): Observable<any> {
    return this.registerJob(filename, Instruction.READ_FILE, null);
  }

  renameFile(oldFilename: string, newFilename) {
    return this.registerJob(oldFilename, Instruction.RENAME, newFilename);
  }

  saveFile(filename: string, data: any): Observable<any> {
    return this.registerJob(filename, Instruction.WRITE_FILE, JSON.stringify(data));
  }

  deleteFile(filename: string): Observable<any> {
    return this.registerJob(filename, Instruction.UNLINK, null);
  }
}
