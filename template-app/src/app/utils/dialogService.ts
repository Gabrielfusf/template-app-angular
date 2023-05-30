import {Component, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogDeleteComponent } from '../core/dialog-delete/dialog-delete/dialog-delete.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DialogService {
    constructor(private dialog: MatDialog) { }
  
    openDeleteDialog(): Observable<any> {
      const dialogRef = this.dialog.open(DialogDeleteComponent, {
        width: '250px'
      });
      return dialogRef.afterClosed();
    }
  }