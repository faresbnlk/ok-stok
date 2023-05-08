import { PingBackendResolver } from './components/maintenace/ping-backend.resolver';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    resolve: { isBackendAlive: PingBackendResolver },
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
