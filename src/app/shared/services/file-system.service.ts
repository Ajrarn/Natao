import { Injectable } from '@angular/core';
import { ApiElectronService } from './api-electron.service';
import { Observable, Subject, interval } from 'rxjs';

const intervalTime = 300;

export enum JobStatus {
  PENDING,
  IN_PROGRESS
}

export interface ResourceJob {
  name: string;
  status: JobStatus,
  instruction: Instruction,
  data: string,
  subject: Subject<any>
  ;
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
  $jobWatcher = interval(intervalTime);

  // to avoid race conditions between read, write, delete on file system
  // all the fileSystems operations are queued
  // a job watcher will execute the different jobs in order, when the previous are finished

  constructor (private apiElectron: ApiElectronService) {

    this.$jobWatcher.subscribe(() => {

      if (this.resourcesJobs.length > 0) {
        const currentJob = this.resourcesJobs[0];

        if (currentJob.status === JobStatus.PENDING) {

          console.log('currentJob', currentJob);

          currentJob.status = JobStatus.IN_PROGRESS;

          if (returnDataInstructions.indexOf(currentJob.instruction) > -1) {
            this.apiElectron.invoke(currentJob.instruction, currentJob.name, currentJob.data).then((data) => {
              currentJob.subject.next(data);
              this.resourcesJobs.shift();
            }).catch((error) => {
              currentJob.subject.error(error);
              this.resourcesJobs.shift();
            });

          } else {
            // return done in subject
            this.apiElectron.invoke(currentJob.instruction, currentJob.name, currentJob.data).then(() => {
              currentJob.subject.next('done');
              this.resourcesJobs.shift();
            }).catch((error) => {
              currentJob.subject.error(error);
              this.resourcesJobs.shift();
            });
          }
        }
      }
    })

  }

  registerJob(name: string, instruction: Instruction, data: string): Subject<any> {
    const subject = new Subject<any>();

    this.resourcesJobs.push({name, status: JobStatus.PENDING, instruction, data, subject});

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
