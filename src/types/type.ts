export interface formValue {
  nome: string;
  cognome: string;
  email: string;
  seleziona_data: string;
  seleziona_orario: string;
  messaggio_aggiuntivo: string;
}

export interface DataType {
  nome: string;
  cognome: string;
  email: string;
  nominativo: string;
  seleziona_data: string;
  seleziona_orario: string;
  messaggio_aggiuntivo: string;
  data_e_orario: string;
}

export interface CredentialsProps {
  email: string;
  password: string;
}