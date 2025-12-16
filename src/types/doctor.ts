export interface Doctor {
    id: string;
    zone: string;
    delegueName: string;
    gamme: string;
    numDemande: string;
    dateDemande: Date;
    nameMedecin: string;
    action: string;
    manifestation: string;
    agence: string;
    numfacture: string;
    dateObtention: Date;
    cheque: string;
    op: string;
}


export interface Product {
  id: number;
  name: string;
  qte: number;
}