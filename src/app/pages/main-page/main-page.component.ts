import { Message, User, UserIdToData } from './../../utils/conts';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  usersObj: Map<string, User> = new Map();
  channelMessagesObj: Map<string, any> = new Map(); // later map <string message> 

  // channelMessagesObj!: UserIdToData;
  
  constructor(private wsService: WebsocketService) { }

  ngOnInit(): void {
    this.wsService.setupSocketConnection();
    //getting users data
    this.wsService.socket.on('allUsers', (Users: any) => {
      Users.map((user: any) => {
        this.usersObj.set(user._id,{ username: user.username, id: user._id })
      })
    });
    //getting mesagges from all channels currently
    this.wsService.socket.on('channelMessages', (allMessagesObj: any) => {
      var firstEntry: boolean = true;
      allMessagesObj.map((messageObj: any) => {
        var sameUser = false;
        if (!firstEntry && this.usersObj.get(messageObj.user)?.username === [...this.channelMessagesObj.values()].at(-1).user.username){
          sameUser=true
        }
        if(firstEntry) firstEntry = false;

        this.channelMessagesObj.set(
          messageObj._id,
          { 
            user: this.usersObj.get(messageObj.user),
            message: messageObj.message,
            createdAt: messageObj.createdAt,
            sameUserAsLast: sameUser? true: false //boolean to not display username again in text channel
          }
        )

        // lastMessageId = messageObj._id;
      })
      console.log(this.channelMessagesObj)
    });
    //updating new messages
    this.wsService.socket.on('newMessageInChannel', (newMessageObj: any) => {
      var sameUser = false;
      if (this.usersObj.get(newMessageObj.user)?.username === [...this.channelMessagesObj.values()].at(-1).user.username){
        sameUser=true
      }
      this.channelMessagesObj.set(
        newMessageObj._id,
        { 
          user: this.usersObj.get(newMessageObj.user),
          message: newMessageObj.message,
          createdAt: newMessageObj.createdAt,
          sameUserAsLast: sameUser
        }
      )
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
  }

}
