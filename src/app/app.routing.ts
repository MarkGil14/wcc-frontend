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
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./views/student/student.module').then((m) => m.StudentModule),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./views/user-profile/user-profile.module').then((m) => m.UserProfileModule),
      },
      {
        path: 'import',
        loadChildren: () =>
          import('./views/import/import.module').then((m) => m.ImportModule),
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
