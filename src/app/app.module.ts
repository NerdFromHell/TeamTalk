import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input'
import { WebsocketService } from './services/websocket.service';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersStatusComponent } from './components/users-status/users-status.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



const ioConfig: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersStatusComponent,
    ChatHistoryComponent,
    MainPageComponent,
    TextBoxComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDividerModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    ScrollingModule,
    SocketIoModule.forRoot(ioConfig),
  ],
  providers: [WebsocketService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
