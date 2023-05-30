import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}
  isSidebarOpen: boolean = false

  ngOnInit(): void {
  }

  goToScreen(){
    this.router.navigate(['/cliente']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
