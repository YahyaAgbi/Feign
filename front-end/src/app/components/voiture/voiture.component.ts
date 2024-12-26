import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Client } from '../../models/client';
import { Voiture } from '../../models/voiture';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent {
  voitures: Voiture[] = [];
  clients: Client[] = [];
  errorMessage: string = '';
  newVoiture: Voiture = new Voiture();
  selectedClientId: number = 0; 
  successMessage: string = '';
  isEditMode: boolean = false; 

  constructor(private voitureService: ApiService) {}

  ngOnInit(): void {
    this.getAllVoitures();
    this.getAllClients();
  }

  getAllVoitures(): void {
    this.voitureService.getAllVoitures().subscribe({
      next: (data) => {
        this.voitures = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des voitures';
        console.error('Erreur lors du chargement des voitures:', err);
      },
    });
  }

  getAllClients(): void {
    this.voitureService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des clients';
        console.error('Erreur lors du chargement des clients:', err);
      },
    });
  }

  ajouterVoiture(): void {
    // Logs pour le débogage
    console.log('Client ID sélectionné :', this.selectedClientId);
    console.log('Nouvelle voiture :', this.newVoiture);

    if (this.selectedClientId === 0) {
      this.errorMessage = 'Veuillez sélectionner un client valide.';
      console.error('Client ID est invalide.');
      return;
    }

    if (!this.newVoiture.marque || !this.newVoiture.model || !this.newVoiture.matricule) {
      this.errorMessage = 'Veuillez remplir tous les champs de la voiture.';
      console.error('Données de la voiture incomplètes :', this.newVoiture);
      return;
    }

    if (!this.isEditMode) {
      this.voitureService.createVoiture(this.selectedClientId, this.newVoiture).subscribe({
        next: () => {
          this.successMessage = 'Voiture ajoutée avec succès !';
          console.log('Voiture ajoutée avec succès.');
          this.resetForm();
          this.getAllVoitures();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'ajout de la voiture.';
          console.error('Erreur du serveur lors de l\'ajout de la voiture :', err);
        },
      });
    } else {
      this.voitureService.updateVoiture(this.newVoiture.id, this.newVoiture).subscribe({
        next: () => {
          this.successMessage = 'Voiture mise à jour avec succès !';
          console.log('Voiture mise à jour avec succès.');
          this.resetForm();
          this.getAllVoitures();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour de la voiture.';
          console.error('Erreur du serveur lors de la mise à jour de la voiture :', err);
        },
      });
    }
  }

  editVoiture(voiture: Voiture): void {
    this.newVoiture = { ...voiture }; 
    this.selectedClientId = voiture.id_client;
    this.isEditMode = true; 
    console.log('Mode édition activé pour la voiture :', voiture);
  }

  resetForm(): void {
    this.newVoiture = new Voiture();
    this.selectedClientId = 0;
    this.isEditMode = false;
    this.successMessage = '';
    this.errorMessage = '';
    console.log('Formulaire réinitialisé.');
  }
}
