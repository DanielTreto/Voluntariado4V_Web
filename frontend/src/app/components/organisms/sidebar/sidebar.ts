import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLinkComponent } from '../../molecules/sidebar-link/sidebar-link';
import { UserProfileComponent } from '../../molecules/user-profile/user-profile';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarLinkComponent, UserProfileComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  links = [
    { label: 'Dashboard', icon: 'bi-grid-fill', route: '/dashboard' },
    { label: 'Volunteers', icon: 'bi-people-fill', route: '/volunteers' },
    { label: 'Organizations', icon: 'bi-building-fill', route: '/organizations' },
    { label: 'Activities', icon: 'bi-list-check', route: '/activities' },
    { label: 'Events', icon: 'bi-calendar-event-fill', route: '/events' },
    { label: 'Reports', icon: 'bi-bar-chart-fill', route: '/reports' },
    { label: 'Settings', icon: 'bi-gear-fill', route: '/settings' }
  ];
}
