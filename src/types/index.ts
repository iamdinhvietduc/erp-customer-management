export interface Customer {
  id: string;
  code: string;
  name: string;
  taxNumber: string;
  businessLicenseDate: string;
  representative: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  category: CustomerCategory;
  assignee: string;
  createdBy: string;
  createdAt: string;
  templates?: CustomerTemplate[];
}

export type CustomerCategory = 
  | 'POTENTIAL' 
  | 'CLOSED' 
  | 'REGULAR' 
  | 'PROMISING';

export interface CustomerTemplate {
  id: string;
  templateId: string;
  templateName: string;
  fileName: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  fileName: string;
  placeholders: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export const CUSTOMER_CATEGORIES = {
  POTENTIAL: 'KH tiềm năng',
  CLOSED: 'KH đã chốt',
  REGULAR: 'KH thường',
  PROMISING: 'KH khả quan'
} as const; 