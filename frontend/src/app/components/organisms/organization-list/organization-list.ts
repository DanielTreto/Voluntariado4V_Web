import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms/badge/badge';
import { ApiService } from '../../../services/api.service';

interface Organization {
  id: number;
  name: string;
  email: string;
  date?: string;
  volunteersCreated?: number;
  status: 'active' | 'pending' | 'org-pending' | 'inactive' | 'suspended';
  logo: string;
  // Extended fields
  nif?: string;
  contactPerson?: string;
  location?: string;
  economicActivity?: string;
  phone?: string;
  description?: string;
}

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.css'
})
export class OrganizationListComponent implements OnInit {
  private apiService = inject(ApiService);
  activeTab: 'pending' | 'registered' = 'pending';
  selectedOrg: Organization | null = null;
  orgToSuspend: Organization | null = null;
  errorMessage: string = '';

  organizations: Organization[] = [];

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.apiService.getOrganizations().subscribe({
      next: (data) => {
        console.log('Organizations received:', data);
        this.organizations = data.map((org: any) => ({
          id: org.id,
          name: org.name,
          email: org.email,
          date: 'N/A', // Backend doesn't provide date yet
          volunteersCreated: 0, // Backend doesn't provide this yet
          status: this.mapStatus(org.status),
          logo: 'assets/images/org-default.png',
          nif: 'N/A',
          contactPerson: 'N/A',
          location: org.scope,
          economicActivity: org.sector,
          phone: org.phone,
          description: org.description
        }));
      },
      error: (err) => {
        console.error('Error loading organizations', err);
        this.errorMessage = 'Error loading data: ' + err.message;
      }
    });
  }

  mapStatus(status: string): 'active' | 'pending' | 'org-pending' | 'inactive' | 'suspended' {
    const map: any = {
      'PENDIENTE': 'org-pending',
      'ACTIVO': 'active',
      'SUSPENDIDO': 'suspended'
    };
    return map[status] || 'pending';
  }

  get pendingOrgs(): Organization[] {
    return this.organizations.filter(o => o.status === 'org-pending' || o.status === 'pending');
  }

  get registeredOrgs(): Organization[] {
    return this.organizations.filter(o => o.status === 'active');
  }

  setActiveTab(tab: 'pending' | 'registered') {
    this.activeTab = tab;
  }

  acceptOrg(org: Organization) {
    this.apiService.updateOrganizationStatus(org.id, 'ACTIVO').subscribe({
      next: () => {
        org.status = 'active';
      },
      error: (err) => {
        console.error('Error accepting organization', err);
        this.errorMessage = 'Error al aceptar organización: ' + err.message;
      }
    });
  }

  denyOrg(org: Organization) {
    if (confirm(`¿Estás seguro de que deseas denegar a ${org.name}?`)) {
      this.apiService.updateOrganizationStatus(org.id, 'SUSPENDIDO').subscribe({
        next: () => {
          org.status = 'suspended';
        },
        error: (err) => {
          console.error('Error denying organization', err);
          this.errorMessage = 'Error al denegar organización: ' + err.message;
        }
      });
    }
  }

  openDetails(org: Organization) {
    this.selectedOrg = org;
  }

  openSuspendConfirm(org: Organization) {
    this.orgToSuspend = org;
  }

  suspendOrg() {
    if (this.orgToSuspend) {
      this.apiService.updateOrganizationStatus(this.orgToSuspend.id, 'SUSPENDIDO').subscribe({
        next: () => {
          this.orgToSuspend!.status = 'suspended';
          this.orgToSuspend = null;
        },
        error: (err) => {
          console.error('Error suspending organization', err);
          this.errorMessage = 'Error al suspender organización: ' + err.message;
        }
      });
    }
  }
}
