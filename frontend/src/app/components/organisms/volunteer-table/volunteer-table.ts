import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../atoms/avatar/avatar';
import { BadgeComponent } from '../../atoms/badge/badge';
import { FormsModule } from '@angular/forms';

interface Volunteer {
  id: number;
  name: string;
  project: string;
  email: string;
  phone: string;
  lastActivity: string;
  status: 'active' | 'pending' | 'inactive' | 'org-pending' | 'suspended' | 'custom';
  avatar: string;
  dni: string;
  address: string;
  course: string;
  availability: string[];
  interests: string[];
}

@Component({
  selector: 'app-volunteer-table',
  standalone: true,
  imports: [CommonModule, AvatarComponent, BadgeComponent, FormsModule],
  templateUrl: './volunteer-table.html',
  styleUrl: './volunteer-table.css'
})
export class VolunteerTableComponent {
  activeTab: 'requests' | 'registered' = 'requests';
  selectedVolunteer: Volunteer | null = null;
  volunteerToDeactivate: Volunteer | null = null;

  volunteers: Volunteer[] = [
    {
      id: 1,
      name: 'Jane Doe',
      project: 'Community Garden Project',
      email: 'jane.doe@example.com',
      phone: '(555) 123-4567',
      lastActivity: '2023-10-26',
      status: 'active',
      avatar: 'assets/images/volunteer-avatar.png',
      dni: '12345678A',
      address: '123 Main St, Springfield',
      course: 'Computer Science',
      availability: ['Lunes 0-1h', 'Miércoles 0-1h'],
      interests: ['Medio Ambiente', 'Educación']
    },
    {
      id: 2,
      name: 'John Smith',
      project: 'Food Bank Initiative',
      email: 'john.smith@example.com',
      phone: '(555) 987-6543',
      lastActivity: '2023-11-01',
      status: 'active',
      avatar: 'assets/images/volunteer-avatar.png',
      dni: '87654321B',
      address: '456 Elm St, Springfield',
      course: 'Social Work',
      availability: ['Martes 0-1h', 'Jueves 0-1h'],
      interests: ['Salud', 'Asistencia Social']
    },
    {
      id: 3,
      name: 'Emily Johnson',
      project: 'Literacy Program',
      email: 'emily.j@example.com',
      phone: '(555) 456-7890',
      lastActivity: '2023-10-15',
      status: 'suspended',
      avatar: 'assets/images/volunteer-avatar.png',
      dni: '11223344C',
      address: '789 Oak St, Springfield',
      course: 'Education',
      availability: ['Viernes 0-1h'],
      interests: ['Educación']
    },
    {
      id: 4,
      name: 'Michael Brown',
      project: 'Pending Assignment',
      email: 'michael.b@example.com',
      phone: '(555) 222-3333',
      lastActivity: '2023-11-20',
      status: 'pending',
      avatar: 'assets/images/volunteer-avatar.png',
      dni: '55667788D',
      address: '321 Pine St, Springfield',
      course: 'Engineering',
      availability: ['Lunes 0-1h', 'Viernes 0-1h'],
      interests: ['Técnico', 'Medio Ambiente']
    },
    {
      id: 5,
      name: 'Sarah Davis',
      project: 'Pending Assignment',
      email: 'sarah.d@example.com',
      phone: '(555) 444-5555',
      lastActivity: '2023-11-25',
      status: 'pending',
      avatar: 'assets/images/volunteer-avatar.png',
      dni: '99887766E',
      address: '654 Maple St, Springfield',
      course: 'Nursing',
      availability: ['Sábado 0-1h'],
      interests: ['Salud']
    }
  ];

  get filteredVolunteers() {
    if (this.activeTab === 'requests') {
      return this.volunteers.filter(v => v.status === 'pending');
    }
    return this.volunteers.filter(v => v.status !== 'pending');
  }

  setTab(tab: 'requests' | 'registered') {
    this.activeTab = tab;
  }

  openDetails(volunteer: Volunteer) {
    this.selectedVolunteer = volunteer;
  }

  openDeactivateConfirm(volunteer: Volunteer) {
    this.volunteerToDeactivate = volunteer;
  }

  deactivateVolunteer() {
    if (this.volunteerToDeactivate) {
      this.volunteerToDeactivate.status = 'suspended';
      this.volunteerToDeactivate = null;
    }
  }

  acceptVolunteer(volunteer: Volunteer) {
    volunteer.status = 'active';
  }

  denyVolunteer(volunteer: Volunteer) {
    this.volunteers = this.volunteers.filter(v => v.id !== volunteer.id);
  }
}
