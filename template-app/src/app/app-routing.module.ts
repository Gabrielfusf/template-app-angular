import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./features/cliente/cliente.module').then((m) => m.ClienteModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
