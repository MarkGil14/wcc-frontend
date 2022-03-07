import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { LandingComponent } from './views/landing/landing.component';
import { AppLandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';

export const AppRoutes: Routes = [
  {
    path: 'app',
    component: FullComponent,
    children: [
   
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
      },

      {
        path: 'announcement',
        loadChildren: () =>
          import('./views/announcement/announcement.module').then((m) => m.AnnouncementModule),
      },
      {
        path: 'job',
        loadChildren: () =>
          import('./views/job/job.module').then((m) => m.JobModule),
      },


      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule),
      },


  
    ],
  },  
  {
    path: '',
    component : AppLandingLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/landing/landing.module').then((m) => m.LandingModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AppBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
 

];
