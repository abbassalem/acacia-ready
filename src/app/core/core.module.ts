import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { ToolbarComponent } from './components/toolbar.component';
import { AppComponent } from './containers/app.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  ToolbarComponent];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
