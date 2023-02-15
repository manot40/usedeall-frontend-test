type Address = {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  postalCode: string;
  state: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type Cart = {
  id: number;
  products: (Pick<Product, 'id' | 'title' | 'price' | 'discountPercentage'> & {
    quantity: number;
    discountPrice: number;
  })[];
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: 'A−' | 'A+' | 'B−' | 'B+' | 'AB−' | 'AB+' | 'O−' | 'O+';
  height: number;
  weight: number;
  eyeColor: string;
  hair: { color: string; type: string };
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: Address;
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
};