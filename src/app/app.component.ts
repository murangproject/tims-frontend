import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  router = inject(Router);

  ngOnInit() {
    this.router.navigate(['login']);
  }
}
