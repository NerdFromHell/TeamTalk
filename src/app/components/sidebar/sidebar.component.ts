import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  public channelNames: any;
  public message: string = '';

  constructor(private wsService: WebsocketService, private messageService: MessageService) { }

  //In the future fetch from the DB voice and text channels from a service 
  ngOnInit(): void {
    this.messageService.getChatroomNames().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => { console.log(data); this.channelNames = data; },
      error: (err: any) => { console.log(err) }
    });
  }

  setMessageText(): void {
    this.messageService.setMessageText(this.message);
  }

  createChannel(): void {
    this.messageService.createChatroom(this.message).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => { console.log(data) },
      error: (err: any) => { console.log(err) }
    }); 
  }

}
