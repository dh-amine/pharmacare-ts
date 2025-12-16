export class Doctor {
  public id: string;
  public zone: string;
  public nomDelg: string;
  public gamme: string;
  public demandeDate: Date;
  public demendeNum: number;
  public prospect: string;
  public action: string;
  public manifestation: string;
  public agence: string;
  public factureNum: string;
  public cheqRm: string;
  public op: string;
  public dateObtained: Date;

  constructor(
    id: string,
    zone: string,
    nomDelg: string,
    gamme: string,
    demandeDate: Date,
    demendeNum: number,
    prospect: string,
    action: string,
    manifestation: string,
    agence: string,
    factureNum: string,
    cheqRm: string,
    op: string,
    dateObtained: Date,
  ) {
    this.id = id;
    this.zone = zone;
    this.nomDelg = nomDelg;
    this.gamme = gamme;
    this.demandeDate = demandeDate;
    this.demendeNum = demendeNum;
    this.prospect = prospect;
    this.action = action;
    this.manifestation = manifestation;
    this.agence = agence;
    this.factureNum = factureNum;
    this.cheqRm = cheqRm;
    this.op = op;
    this.dateObtained = dateObtained;
  }

  /**
   * Returns a static dummy doctor (always the same values)
   */
  public static generateDummy(): Doctor[] {
    return [new Doctor(
      "doctor-001",
      "North",
      "Delegate A",
      "Generalist",
      new Date("2025-01-10"),
      12345,
      "Dr. John Doe",
      "Visit",
      "Conference",
      "A1",
      "FAC-001",
      "CHQ-001",
      "OP-001",
      new Date("2025-01-15")
    )];
  }

  /**
   * Get a doctor by ID from a list
   */
  public static getById( id: string): Doctor | undefined {
    return this.generateDummy().find(doc => doc.id === id);
  }
}
