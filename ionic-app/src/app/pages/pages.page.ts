import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.page.html',
  styleUrls: ['pages.page.scss']
})
export class PagesPage {

  homeTitle = 'Accueil';
  accountTitle = 'Mon compte';
  registerTitle = 'Inscription';
  loginTitle = 'Connexion';

  constructor() {}

}
