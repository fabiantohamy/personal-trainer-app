export type Customer = Omit<CustomerData, "_links">;

export type CustomerData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
};

export type Training = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  };
};

export type NavigationBarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export type AddCustomerProps = {
  fetchCustomers: () => void;
};

export type EditCustomerProps = {
  data: CustomerData;
  fetchCustomers: () => void;
};

export type AddTrainingProps = {
  fetchTrainings: () => void;
};

export type CustomerContentProps = {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
};

export type TrainingContentProps = {
  training: {
    date: string;
    duration: string;
    activity: string;
    customer: string;
  };
  setTraining: React.Dispatch<React.SetStateAction<any>>;
  customers: CustomerData[];
};

export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
};
