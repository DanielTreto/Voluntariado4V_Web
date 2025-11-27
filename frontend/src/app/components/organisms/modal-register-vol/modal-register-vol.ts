import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-register-vol',
  imports: [],
  templateUrl: './modal-register-vol.html',
  styleUrl: './modal-register-vol.scss',
})
export class ModalRegisterVol {
  onClose = output();

  onOpenLogin = output(); 

  constructor() {}

  closeModal(): void {
    this.onClose.emit(); // Pide al App Component que cierre el modal
  }

  openLoginModal(): void {
    this.onOpenLogin.emit(); // Pide al App Component que muestre el modal de Login
  }

  registerVolunteer(): void {
    // ⚠️ Lógica de validación y envío de datos de registro iría aquí ⚠️
    console.log('Datos de voluntario enviados...');
    
    // Opcional: Cerrar el modal tras el registro exitoso
    // this.closeModal();
  }
}
