import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/utils-service/shared.service';

@Component({
  selector: 'app-maintenace',
  templateUrl: './maintenace.component.html',
  styleUrls: ['./maintenace.component.scss'],
})
export class MaintenaceComponent implements OnInit {

  constructor(private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {}

  async goToHome(){
    this.sharedService.getIsBackendAlive();
    this.router.navigateByUrl('pages/home');
    window.location.reload();
  }
}
