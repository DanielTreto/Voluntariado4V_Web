import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  imports: [],
  templateUrl: './modal-login.html',
  styleUrl: './modal-login.scss',
})
export class ModalLogin {

  onModalClick = output(); 

  onRegisterVolClick = output();

  onRegisterOrgClick = output();

  onClose = output();

  // Este método emite un evento que el AppComponent captura
  closeModal(): void {
    this.onClose.emit();
  }

  login():void{
    this.onModalClick.emit();
  }

  openVolunteerRegister():void{
    this.onRegisterVolClick.emit();
  }

  openOrgRegister():void{
    this.onRegisterOrgClick.emit();
  }

}
