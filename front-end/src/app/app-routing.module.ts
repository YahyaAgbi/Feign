import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoitureComponent } from './components/voiture/voiture.component';
import { Client } from './models/client';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {
    path:"voiture", component:VoitureComponent
  },
  {
    path:"client", component:ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
