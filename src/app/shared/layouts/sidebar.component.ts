import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { TopSideNavItems, BottomSideNavItems } from './menulist';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  title = '';
  TopSideNavItems: any;
  BottomSideNavItems: any;
  fullName = 'John Doe';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activatedRoute.firstChild?.title.subscribe(data => {
        this.title = data ?? '';
      });
    });

    const role = localStorage.getItem('role') ?? '';
    this.TopSideNavItems =
      TopSideNavItems[role as keyof typeof TopSideNavItems];

    this.BottomSideNavItems =
      BottomSideNavItems[role as keyof typeof BottomSideNavItems];

    this.fullName = localStorage.getItem('fullName') ?? '';
  }
}
