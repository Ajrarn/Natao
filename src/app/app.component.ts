import { Component } from '@angular/core';
import { ApiElectronService } from "./shared/services/api-electron.service";
import { FileSystemService } from './shared/services/file-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Natao';

  constructor(public apiElectron: ApiElectronService, private fileSystemService: FileSystemService) {

    if (this.apiElectron.isElectron) {

      //config
      const appDirectory = this.apiElectron.sendSync('getConfig', 'appDirectory');
      console.log('appDirectory', appDirectory);

      //test mkDir
      this.fileSystemService.saveDirectory('titi').subscribe((result) => {
        console.log('saveTiti', result);
      });

      //test renameDir
      this.fileSystemService.renameDirectory('titi', 'tata').subscribe((result) => {
        console.log('renameTiti', result);
      });

      // test delete dir
      this.fileSystemService.deleteDirectory('tata').subscribe((result) => {
        console.log('deleteTata', result);
      });



      //test createFile
      this.fileSystemService.saveFile('test1', {test: true}).subscribe((result) => {
        console.log('createFile', result);
      });


      //test readFile
      this.fileSystemService.readFile('test1').subscribe((result) => {
        console.log('readFile', result);
      });

      //test renameFile
      this.fileSystemService.renameFile('test1', 'test2').subscribe((result) => {
        console.log('renameTest1', result);
      });

      //test deleteFile
      this.fileSystemService.deleteFile('test2').subscribe((result) => {
        console.log('deleteTest2', result);
      });

    }
  }
}
