export interface IAddress {
  postalCode: string;
  street: string;
  number: number;
  city: string;
  state: string;
  complement?: string;
  reference?: any;
  district: string;
  type?: 'COMMERCIAL' | 'RESIDENTIAL' | 'KINSHIP'
}
