import { Component } from '@angular/core';
import $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'WebSocket';
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient: any;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame: any) => {
      that.stompClient.subscribe('/chat', (message: any) => {
        if (message.body) {
          $('.chat').append('<div class="message">' + message.body + '</div>');
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/send/message', {}, message);
    $('#input').val('');
    // document.getElementById('input').
  }
}
