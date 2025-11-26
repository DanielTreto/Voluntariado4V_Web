import { Component, output } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  onHeaderClick = output<String>(); 

  // Este método emite un evento que el AppComponent captura
  openLogin(): void {
    this.onHeaderClick.emit('login');
  }

  openRegister():void{
    this.onHeaderClick.emit('register');
  }
}
