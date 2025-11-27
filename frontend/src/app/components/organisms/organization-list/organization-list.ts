import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms/badge/badge';

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
export class OrganizationListComponent {
  activeTab: 'pending' | 'registered' = 'pending';
  selectedOrg: Organization | null = null;
  orgToSuspend: Organization | null = null;

  pendingOrgs: Organization[] = [
    {
      id: 1,
      name: 'Future Horizons NGO',
      email: 'contact@future.org',
      date: '2025-11-20',
      status: 'org-pending',
      logo: 'assets/images/org-logo-1.png',
      nif: 'B12345678',
      contactPerson: 'Alice Walker',
      location: 'Madrid',
      economicActivity: 'Non-Profit',
      phone: '+34 600 111 222',
      description: 'Dedicated to providing educational resources to underprivileged communities.'
    }
  ];

  registeredOrgs: Organization[] = [
    {
      id: 2,
      name: 'Soluciones Globales A.C.',
      email: 'info@globales.com',
      volunteersCreated: 12,
      status: 'active',
      logo: 'assets/images/org-logo-2.png',
      nif: 'A87654321',
      contactPerson: 'Robert Smith',
      location: 'Barcelona',
      economicActivity: 'Environmental Services',
      phone: '+34 600 333 444',
      description: 'Focused on sustainable development and environmental protection projects.'
    },
    {
      id: 3,
      name: 'Community Helpers',
      email: 'hello@helpers.org',
      volunteersCreated: 5,
      status: 'active',
      logo: 'assets/images/org-logo-1.png',
      nif: 'G11223344',
      contactPerson: 'Maria Garcia',
      location: 'Valencia',
      economicActivity: 'Social Work',
      phone: '+34 600 555 666',
      description: 'Local community support for elderly and disabled citizens.'
    }
  ];

  setActiveTab(tab: 'pending' | 'registered') {
    this.activeTab = tab;
  }

  acceptOrg(org: Organization) {
    this.pendingOrgs = this.pendingOrgs.filter(o => o.id !== org.id);
    const newOrg: Organization = {
      ...org,
      status: 'active',
      volunteersCreated: 0
    };
    this.registeredOrgs.push(newOrg);
  }

  denyOrg(org: Organization) {
    this.pendingOrgs = this.pendingOrgs.filter(o => o.id !== org.id);
  }

  openDetails(org: Organization) {
    this.selectedOrg = org;
  }

  openSuspendConfirm(org: Organization) {
    this.orgToSuspend = org;
  }

  suspendOrg() {
    if (this.orgToSuspend) {
      this.orgToSuspend.status = 'suspended';
      this.orgToSuspend = null;
    }
  }
}
