import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { RepetitionWebAppCoreModule } from 'app/core/core.module';
import { RepetitionWebAppAppRoutingModule } from './app-routing.module';
import { RepetitionWebAppHomeModule } from './home/home.module';
import { RepetitionWebAppEntityModule } from './entities/entity.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

import { RepetitionService } from './services/repetition.service';

@NgModule({
  imports: [
    BrowserModule,
    RepetitionWebAppSharedModule,
    RepetitionWebAppCoreModule,
    RepetitionWebAppHomeModule,
    RepetitionWebAppEntityModule,
    RepetitionWebAppAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  providers: [RepetitionService],
  bootstrap: [MainComponent],
})
export class RepetitionWebAppAppModule {}
