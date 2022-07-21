export interface IAddress {
  postalCode: string;
  address: string;
  number: number;
  city: string;
  state: string;
  complement?: string;
  reference?: any;
  district: string;
  type?: 'COMMERCIAL' | 'RESIDENTIAL' | 'KINSHIP'
}
