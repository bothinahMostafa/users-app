import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
    const navbarMobile = document.getElementById('navbar-mobile');
    navbarMobile.addEventListener('click', ()=> {
      document.getElementById('navbarSupportedContent').classList.toggle('show');
    });
  }
}
