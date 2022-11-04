import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHistoryComponent implements OnInit {

  @Input() allUsersObj: any;
  @Input() channelMessagesObj!: Map<string, any>;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor() { }

  ngOnInit(): void {
   }

   ngAfterViewInit() {
    setTimeout(()=>{

      console.log([...this.channelMessagesObj.values()])
    },2000)
   }
}
