import { ImageSourcePropType } from 'react-native';

export type Coffee = {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: ImageSourcePropType;
  description: string;
};

export const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano'];

const DESCRIPTION =
  'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the foam is about 2 cm thick. Served hot or iced, it is rich, creamy and perfectly balanced.';

export const coffees: Coffee[] = [
  {
    id: '1',
    name: 'Caffe Mocha',
    type: 'Deep Foam',
    category: 'Latte',
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    image: require('../../assets/images/mocha.png'),
    description: DESCRIPTION,
  },
  {
    id: '2',
    name: 'Flat White',
    type: 'Espresso',
    category: 'Machiato',
    price: 3.53,
    rating: 4.8,
    reviews: 198,
    image: require('../../assets/images/flatwhite.png'),
    description: DESCRIPTION,
  },
  {
    id: '3',
    name: 'Americano',
    type: 'Espresso',
    category: 'Americano',
    price: 3.2,
    rating: 4.8,
    reviews: 120,
    image: require('../../assets/images/mocha.png'),
    description: DESCRIPTION,
  },
  {
    id: '4',
    name: 'Caramel Machiato',
    type: 'Deep Foam',
    category: 'Machiato',
    price: 4.1,
    rating: 4.8,
    reviews: 87,
    image: require('../../assets/images/flatwhite.png'),
    description: DESCRIPTION,
  },
];

export const getCoffee = (id: string) => coffees.find((c) => c.id === id) ?? coffees[0];
