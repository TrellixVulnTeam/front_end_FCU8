import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Files } from './model/file.model';
import { FileUploadService } from './service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public filesList$: Observable<Files[]>

  constructor(private fileService: FileUploadService) { 
    this.filesList$ = new Observable<Files[]>();
  }

  ngOnInit(): void {
    this.filesList$ = this.fileService.getFiles();
  }

  addFile(file: Files){
    this.filesList$.subscribe({
      next: (list) => {
        let isFile = list.find(res => {
          return res.name == file.name;
        })
        if(isFile){
          alert("Duplicate");
        }
        else{
          this.uploadFile(file);
        }
      }
    })
  }

  uploadFile(file: Files) {
    this.fileService.addFiles(file).subscribe({
      next: () => {
        alert("File Added Successfully");
        this.filesList$ = this.fileService.getFiles();
      },
      error: (e) => { console.log(e) }
    })
  }
  deleteFile(id: number){
    this.fileService.deleteFiles(id).subscribe((data) => {
      console.log(data);
    })
  }

}
