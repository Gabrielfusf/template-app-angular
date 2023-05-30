import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../core/snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message },
      duration: 2000 // Duração em milissegundos
    });
  }
}