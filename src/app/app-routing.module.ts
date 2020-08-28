import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { FaceComponent } from './face/face.component';


const routes: Routes = [
  { path: 'game', component: GameComponent},
  { path: 'face', component: FaceComponent},
  { path: '', component: FaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
