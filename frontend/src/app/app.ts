import { Component, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { HomePage } from "./home-page/home-page";
import { ModalLogin } from "./modal-login/modal-login";
import { ModalRegisterVol } from "./modal-register-vol/modal-register-vol";
import { ModalRegisterOrg } from "./modal-register-org/modal-register-org";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, HomePage, ModalLogin, CommonModule, ModalRegisterVol, ModalRegisterOrg],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  activeModalType: string | null = null; 

  constructor(private el: ElementRef) {}

  openModal(type: string): void {
    // Asigna el tipo de modal a la variable para mostrarlo en el template
    this.activeModalType = type; 
  }

  // Ahora el closeModal pone el estado en null
  closeModal(): void {
    this.activeModalType = null;
  }

  // Método para manejar la navegación de vuelta desde el modal de registro
  openLoginFromRegister(): void {
    this.activeModalType = 'login';
  }

  // Cierra el modal si se hace clic en el overlay (fondo negro)
  closeOnOverlayClick(event: MouseEvent): void {
    const overlayElement = this.el.nativeElement.querySelector('.modal-overlay-container');
    if (event.target === overlayElement) {
      this.closeModal();
    }
  }
}
