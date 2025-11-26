import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  imports: [],
  templateUrl: './modal-login.html',
  styleUrl: './modal-login.scss',
})
export class ModalLogin {
  onModalClick = output<String>(); 

  // Este método emite un evento que el AppComponent captura
  closeModal(): void {
    this.onModalClick.emit('close');
  }

  login():void{
    this.onModalClick.emit('register');
  }

  openVolunteerRegister():void{
    this.onModalClick.emit('register');
  }

  openOrgRegister():void{
    this.onModalClick.emit('register');
  }

}
