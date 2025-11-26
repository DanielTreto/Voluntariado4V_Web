import { Component, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { HomePage } from "./home-page/home-page";
import { ModalLogin } from "./modal-login/modal-login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, HomePage, ModalLogin, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  // 🌟 VARIABLE DE ESTADO SIMPLE 🌟
  isModalOpen: boolean = false; 

  constructor(private el: ElementRef) {} // Ya no necesitamos ModalService aquí

  // Método para abrir el modal
  openModal(type: string): void {
    // Si usaras varios modales, esta lógica elegiría cuál abrir
    if (type === 'login') {
        this.isModalOpen = true;
    }
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Cierra el modal si se hace clic en el overlay (fondo negro)
  closeOnOverlayClick(event: MouseEvent): void {
    const overlayElement = this.el.nativeElement.querySelector('.modal-overlay-container');
    if (event.target === overlayElement) {
      this.closeModal();
    }
  }
}
