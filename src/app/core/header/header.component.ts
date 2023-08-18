import { Component, inject, DoCheck } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterLink,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class HeaderComponent implements DoCheck {
  isAdmin = false;
  isLoggedIn = false;

  ngDoCheck(): void {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    if (sessionStorage.getItem('email') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
