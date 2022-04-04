  import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileListPresenterService {

  private delete: Subject<number>;
  public delete$: Observable<number>;

  constructor() { 
    this.delete = new Subject();
    this.delete$ = new Observable();
    this.delete$ = this.delete.asObservable();
  }

  showFile(content: string, type: string){

  }
  onDelete(id: number) {
    this.delete.next(id);
    console.log(id)
  }
}
