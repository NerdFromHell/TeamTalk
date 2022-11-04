import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { WebsocketService } from './websocket.service';
import { environment } from 'src/environments/environment';

const API = 'http://localhost:3000';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
    })
};

@Injectable({providedIn: 'root'})
export class MessageService {
    messageText: BehaviorSubject<string>;
    allMessagesInChannel: BehaviorSubject<string>;

    constructor(private http: HttpClient, private wsService: WebsocketService) {
        this.messageText = new BehaviorSubject('');
        this.allMessagesInChannel = new BehaviorSubject('');
    }

    setMessageText(updatedText: string): void{
        this.messageText.next(updatedText);
    }
    
    getMessageText(): string {
        return this.messageText.value;
    }

    send_message() {
        var message: string = this.getMessageText();

        this.wsService.socket.emit('saveMessageInChannel', { chatroom: 'general', message });

        console.log('sent')
        //return this.httpClient.post(`${API}/send` ,{ message }, httpOptions);
    }

    get_all_messages() { //: Observable<Object>
        // return this.wsService.socket.on('channelMessages', (data: string) => {
        //     console.log(data)
        //     this.allMessagesInChannel.next(data);
        // });
        // return this.httpClient.get(`${API}/recieve_all_messages`, httpOptions);
    }

    getMessageHistory(): string {
        return this.allMessagesInChannel.value;
    }



    getChatroomNames() {
        return this.http.get(`${environment.SOCKET_ENDPOINT}/chatroom/getallchatroom`,
                                { 
                                    // headers: {
                                    //     query: {
                                    //        // token: localStorage.getItem('token') || ''
                                    //     }
                                    // }
                                }
                            );
    }

    createChatroom(name: string) {
        return this.http.post(`${environment.SOCKET_ENDPOINT}/chatroom/createchatroom`,
                                { 
                                    name, 
                                    query: {
                                        token: localStorage.getItem('token') || ''
                                    },
                                },  
                                environment.httpOptions );
    }

    
}