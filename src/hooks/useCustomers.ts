import { Customer, Template } from '@/types';
import { mockCustomers, mockTemplates } from '@/data/mockData';
import { useLocalStorage } from './useLocalStorage';

export function useCustomers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', mockCustomers);
  const [templates, setTemplates] = useLocalStorage<Template[]>('templates', mockTemplates);

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt' | 'templates'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      templates: []
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === id 
          ? { ...customer, ...updates }
          : customer
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const getCustomerById = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  const addTemplate = (template: Omit<Template, 'id' | 'createdAt'>) => {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTemplates(prev => [...prev, newTemplate]);
    
    setCustomers(prev => 
      prev.map(customer => ({
        ...customer,
        templates: [
          ...(customer.templates || []),
          {
            id: Date.now().toString() + customer.id,
            templateId: newTemplate.id,
            templateName: newTemplate.name,
            fileName: `${newTemplate.fileName.replace('.docx', '')}-${customer.code.toLowerCase()}.docx`,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      }))
    );
    
    return newTemplate;
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    
    setCustomers(prev => 
      prev.map(customer => ({
        ...customer,
        templates: customer.templates?.filter(t => t.templateId !== id) || []
      }))
    );
  };

  return {
    customers,
    templates,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    addTemplate,
    deleteTemplate
  };
} 