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
