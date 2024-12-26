import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients: Client[] = [];
  newClient: Client = new Client();
  isEditMode = false;
  selectedClientId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.apiService.getAllClients().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement des clients.')
    });
  }

  addOrUpdateClient(): void {
    if (this.isEditMode && this.selectedClientId !== null) {
      // Update existing client
      this.apiService.UpdateClient(this.selectedClientId, this.newClient).subscribe({
        next: () => {
          this.successMessage = 'Client mis à jour avec succès.';
          this.resetForm();
          this.loadClients();
        },
        error: () => (this.errorMessage = 'Erreur lors de la mise à jour du client.')
      });
    } else {
      // Add new client
      this.apiService.saveClient(this.newClient).subscribe({
        next: () => {
          this.successMessage = 'Client ajouté avec succès.';
          this.resetForm();
          this.loadClients();
        },
        error: () => (this.errorMessage = 'Erreur lors de l\'ajout du client.')
      });
    }
  }

  editClient(client: Client): void {
    this.isEditMode = true;
    this.selectedClientId = client.id!;
    this.newClient = { ...client };
  }

  deleteClient(clientId: number): void {
    this.apiService.DeleteClient(clientId).subscribe({
      next: () => {
        this.successMessage = 'Client supprimé avec succès.';
        this.loadClients();
      },
      error: () => (this.errorMessage = 'Erreur lors de la suppression du client.')
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedClientId = null;
    this.newClient = new Client();
  }
}
