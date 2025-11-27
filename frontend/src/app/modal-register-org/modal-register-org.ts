import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-register-org',
  imports: [],
  templateUrl: './modal-register-org.html',
  styleUrl: './modal-register-org.scss',
})
export class ModalRegisterOrg {
  onClose = output(); 
  onOpenLogin = output(); 

  constructor() {}

  closeModal(): void {
    this.onClose.emit(); 
  }

  openLoginModal(): void {
    this.onOpenLogin.emit();
  }

  registerOrganization(): void {
    // ⚠️ Lógica de envío de datos de registro de la organización iría aquí ⚠️
    console.log('Datos de organización enviados...');
  }
}
