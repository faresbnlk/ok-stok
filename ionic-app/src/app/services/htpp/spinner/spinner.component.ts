import { LoaderInterceptorService } from './../loader-interceptor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  constructor(public loader: LoaderInterceptorService) { }

  ngOnInit() {}

}
