import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../atoms/avatar/avatar';
import { BadgeComponent } from '../../atoms/badge/badge';
import { FormsModule } from '@angular/forms';

interface Volunteer {
  id: number;
  name: string;
  avatar: string;
  details?: string; // For "Ver más info"
}

interface Organization {
  name: string;
  logo: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  organization: Organization;
  volunteers: Volunteer[];
  type: 'Medio Ambiente' | 'Social' | 'Tecnológico' | 'Educativo' | 'Salud';
  status: 'active' | 'pending';
}

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule, AvatarComponent, BadgeComponent, FormsModule],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityListComponent {
  activeTab: 'active' | 'pending' = 'active';

  // Dummy data for all available volunteers
  allVolunteers: Volunteer[] = [
    { id: 1, name: 'Jane Doe', avatar: 'assets/images/volunteer-avatar.png', details: 'Experiencia en medio ambiente.' },
    { id: 2, name: 'John Smith', avatar: 'assets/images/volunteer-avatar.png', details: 'Experto en logística.' },
    { id: 3, name: 'Michael Brown', avatar: 'assets/images/volunteer-avatar.png', details: 'Ingeniero de software.' },
    { id: 4, name: 'Sarah Davis', avatar: 'assets/images/volunteer-avatar.png', details: 'Enfermera titulada.' },
    { id: 5, name: 'David Wilson', avatar: 'assets/images/volunteer-avatar.png', details: 'Profesor de secundaria.' }
  ];

  // Dummy data for organizations
  allOrganizations: Organization[] = [
    { name: 'EcoFriendly', logo: 'assets/images/org-logo-1.png' },
    { name: 'Tech4All', logo: 'assets/images/org-logo-2.png' },
    { name: 'Ayuda Solidaria', logo: 'assets/images/org-logo-1.png' },
    { name: 'Educa+', logo: 'assets/images/org-logo-2.png' }
  ];

  activities: Activity[] = [
    {
      id: 1,
      title: 'Limpieza de Playa',
      description: 'Jornada de limpieza y concienciación ambiental en la playa local.',
      location: 'Playa de la Concha',
      date: '2025-12-05',
      image: 'assets/images/activity-1.jpg',
      organization: { name: 'EcoFriendly', logo: 'assets/images/org-logo-1.png' },
      volunteers: [
        { id: 1, name: 'Jane Doe', avatar: 'assets/images/volunteer-avatar.png' },
        { id: 2, name: 'John Smith', avatar: 'assets/images/volunteer-avatar.png' }
      ],
      type: 'Medio Ambiente',
      status: 'active'
    },
    {
      id: 2,
      title: 'Taller de Programación',
      description: 'Enseñanza de conceptos básicos de programación a jóvenes.',
      location: 'Centro Cívico',
      date: '2025-12-10',
      image: 'assets/images/activity-2.jpg',
      organization: { name: 'Tech4All', logo: 'assets/images/org-logo-2.png' },
      volunteers: [
        { id: 3, name: 'Michael Brown', avatar: 'assets/images/volunteer-avatar.png' }
      ],
      type: 'Tecnológico',
      status: 'active'
    },
    {
      id: 3,
      title: 'Reparto de Alimentos',
      description: 'Distribución de alimentos a familias necesitadas del barrio.',
      location: 'Banco de Alimentos',
      date: '2025-12-15',
      image: 'assets/images/activity-3.jpg',
      organization: { name: 'Ayuda Solidaria', logo: 'assets/images/org-logo-1.png' },
      volunteers: [],
      type: 'Social',
      status: 'active'
    },
    {
      id: 4,
      title: 'Clases de Apoyo',
      description: 'Refuerzo escolar para niños en riesgo de exclusión.',
      location: 'Biblioteca Municipal',
      date: '2025-12-20',
      image: 'assets/images/activity-1.jpg',
      organization: { name: 'Educa+', logo: 'assets/images/org-logo-2.png' },
      volunteers: [],
      type: 'Educativo',
      status: 'pending'
    }
  ];

  selectedActivity: Activity | null = null;
  activityToDelete: Activity | null = null;

  // For Create Activity
  newActivity: Partial<Activity> = {
    title: '',
    description: '',
    location: '',
    date: '',
    type: 'Social',
    image: 'assets/images/activity-1.jpg',
    organization: undefined,
    volunteers: [],
    status: 'active'
  };

  // For Add Volunteer
  selectedVolunteerId: number | null = null;
  selectedOrgName: string | null = null;

  get filteredActivities() {
    return this.activities.filter(a => a.status === this.activeTab);
  }

  setTab(tab: 'active' | 'pending') {
    this.activeTab = tab;
  }

  openEdit(activity: Activity) {
    this.selectedActivity = { ...activity };
  }

  openDeleteConfirm(activity: Activity) {
    this.activityToDelete = activity;
  }

  deleteActivity() {
    if (this.activityToDelete) {
      this.activities = this.activities.filter(a => a.id !== this.activityToDelete!.id);
      this.activityToDelete = null;
    }
  }

  saveActivity() {
    if (this.selectedActivity) {
      const index = this.activities.findIndex(a => a.id === this.selectedActivity!.id);
      if (index !== -1) {
        this.activities[index] = this.selectedActivity;
      }
      this.selectedActivity = null;
    }
  }

  openAddVolunteer(activity: Activity) {
    this.selectedActivity = activity;
    this.selectedVolunteerId = null;
  }

  addVolunteer() {
    if (this.selectedActivity && this.selectedVolunteerId) {
      const volunteer = this.allVolunteers.find(v => v.id == this.selectedVolunteerId);
      if (volunteer) {
        // Check if already added
        if (!this.selectedActivity.volunteers.find(v => v.id === volunteer.id)) {
          this.selectedActivity.volunteers.push(volunteer);
        }
      }
      this.selectedVolunteerId = null;
      this.selectedActivity = null;
    }
  }

  viewVolunteerInfo() {
    if (this.selectedVolunteerId) {
      const volunteer = this.allVolunteers.find(v => v.id == this.selectedVolunteerId);
      if (volunteer) {
        alert(`Información del voluntario:\nNombre: ${volunteer.name}\nDetalles: ${volunteer.details}`);
      }
    }
  }

  // Create Activity
  createActivity() {
    const newId = Math.max(...this.activities.map(a => a.id)) + 1;

    // Find selected org
    let org = this.allOrganizations.find(o => o.name === this.selectedOrgName);
    if (!org) {
      org = this.allOrganizations[0]; // Fallback
    }

    const activity: Activity = {
      id: newId,
      title: this.newActivity.title || 'Nueva Actividad',
      description: this.newActivity.description || '',
      location: this.newActivity.location || '',
      date: this.newActivity.date || '',
      image: this.newActivity.image || 'assets/images/activity-1.jpg',
      organization: org,
      volunteers: [],
      type: this.newActivity.type as any,
      status: 'active'
    };
    this.activities.push(activity);
    // Reset form
    this.newActivity = {
      title: '',
      description: '',
      location: '',
      date: '',
      type: 'Social',
      image: 'assets/images/activity-1.jpg',
      organization: undefined,
      volunteers: [],
      status: 'active'
    };
    this.selectedOrgName = null;
  }

  // Pending Actions
  acceptActivity(activity: Activity) {
    activity.status = 'active';
  }

  denyActivity(activity: Activity) {
    this.activities = this.activities.filter(a => a.id !== activity.id);
  }
}
