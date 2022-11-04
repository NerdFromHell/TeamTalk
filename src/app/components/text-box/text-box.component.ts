import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  message: string = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { }

  
  setMessageText(): void {
    this.messageService.setMessageText(this.message);
  }

  send_message(): void {
    if(this.message !== ''){
      console.log('sent')
      this.messageService.send_message()
      this.message = '';
      this.setMessageText();
      // .subscribe({
      //   next: (data): void => {
      //     console.log(data);
      //   },
      //   error: (err): void => {
      //     console.log(err);
      //   }
      // });;
    }
  }

}
