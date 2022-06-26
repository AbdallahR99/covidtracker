import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { CountryResolver } from './pages/country/country.resolver';

const routes: Routes = [
  {
    title: 'Home',
    path: AppRoutes.HOME.substring(1),
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    title: 'country',
    path: AppRoutes.COUNTRY.substring(1) + '/:country',
    resolve: { resolverData: CountryResolver },
    loadChildren: () => import('./pages/country/country.module').then(m => m.CountryModule)
  },

  { path: '', redirectTo: AppRoutes.HOME, pathMatch: 'full' },
  { path: '**', redirectTo: AppRoutes.HOME, pathMatch: 'full' },
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      errorHandler: (error: any) => {
        console.error('routing error', error);
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
