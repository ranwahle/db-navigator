import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DBNavigatorComponent } from './db-navigator/db-navigator.component';
import { DbDataService } from './db-data.service';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@NgModule({
  declarations: [AppComponent, DBNavigatorComponent, TreeNodeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [DbDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
