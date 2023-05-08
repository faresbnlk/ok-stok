import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  homeTitle = 'Accueil';
  accountTitle = 'Mon compte';
  registerTitle = 'Inscription';
  loginTitle = 'Connexion';

  constructor() { }

  ngOnInit() {}

}
