import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SnackbarService } from 'src/app/utils/snackBarService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteListComponent } from './cliente-list.component';

describe('ClienteListComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteListComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule],
      providers: [SnackbarService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('should search', fakeAsync(() => {
    component.searchClient();
    tick(1000);
    expect(component.loadingTable).toBe(false);
 
  }));
 
  it('should delete', fakeAsync(() => {

    component.clientService.deleteClient(2);
    tick(2000);
    expect(component.loadingTable).toBe(false);
  }));


});
