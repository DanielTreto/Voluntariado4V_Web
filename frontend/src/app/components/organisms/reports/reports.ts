import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements AfterViewInit {
  @ViewChild('growthChart') growthChartRef!: ElementRef;
  @ViewChild('distributionChart') distributionChartRef!: ElementRef;

  ngAfterViewInit() {
    this.initCharts();
  }

  initCharts() {
    new Chart(this.growthChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
        datasets: [{
          label: 'Voluntariados Creados',
          data: [15, 22, 35, 48, 55, 75],
          borderColor: '#1e88e5',
          backgroundColor: 'rgba(30, 136, 229, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#1e88e5'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(this.distributionChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Medio Ambiente', 'Educación', 'Asistencia Social', 'Cultural'],
        datasets: [{
          label: 'Eventos Activos',
          data: [35, 40, 15, 10],
          backgroundColor: [
            '#4CAF50',
            '#1e88e5',
            '#FF9800',
            '#E91E63'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }
}
