import banana from '../assets/banana.png';
import maca from '../assets/maca.png';

const produtos= [
    {
        id: 1,
        name: 'Banana',
        description: 'Fruta',
        price: 3.0,
        img: banana,
    },
    {
        id: 2,
        name: 'Maçã',
        description: 'Fruta',
        price: 2.0,
        img: maca,
    },
    {
        id: 3,
        name: 'Abacaxi',
        description: 'Fruta',
        price: 5.0,
    },
    {
        id: 4,
        name: 'Melancia',
        description: 'Fruta',
        price: 2.0,
    },
    {
        id: 5,
        name: 'Abacate',
        description: 'Fruta',
        price: 2.55,
    },
    {
        id: 6,
        name: 'Uva',
        description: 'Fruta',
        price: 4.99,
    },
    {
        id: 7,
        name: 'Amora',
        description: 'Fruta',
        price: 5.99,
    },
    {
        id: 8,
        name: 'Babaca',
        description: 'Fruta',
        price: 12.20,
    },
    {
        id: 9,
        name: 'Cacau',
        description: 'Fruta',
        price: 5.60,
    },
    {
        id: 10,
        name: 'Caju',
        description: 'Fruta',
        price: 5.0,
    },
    
]

export class ProductService {
    getProducts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(produtos);
            }, 200);
        })
    }
}