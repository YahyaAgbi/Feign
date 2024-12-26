import { Client } from './client';

export class Voiture {
  id!: number;
  marque!: string;
  matricule!: string;
  model!: string;
  id_client!: number;
  client?: Client; 
}
