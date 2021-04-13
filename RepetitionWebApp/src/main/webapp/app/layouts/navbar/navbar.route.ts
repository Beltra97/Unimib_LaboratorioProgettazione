import { Route } from '@angular/router';

import { NavbarComponent } from './navbar.component';

export const navbarRoute: Route = {
  path: '', // '' return to the homepage
  component: NavbarComponent,
  outlet: 'navbar',
};
