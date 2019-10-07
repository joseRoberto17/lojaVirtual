import adidas from '../assets/adidas.png';
import adidas2 from '../assets/adidas2.jpg';
import vibe from '../assets/vibe.jpg';
import vibe2 from '../assets/vibe2.jpg';
import bota from '../assets/bota.jpg';
import bota2 from '../assets/bota2.jpg';
import meia from '../assets/meia.jpg';
import calca from '../assets/calca.jpg';
import chinelo from '../assets/chinelo.jpg';
import sapatenis from '../assets/sapatenis.jpg';


const produtos= [
    {
        id: 1,
        name: 'Adidas Grand',
        description: 'Inspirado nos tênis clássicos dos anos 70, o Tênis Adidas Grand Court Base Masculino é ideal para os homens que buscam dar uma repaginada no visual. Com excelente ventilação interna, o modelo possui as três listras laterais icônicas da marca e solado emborrachado que garante aderência. Aposte em você, compre já o seu!',
        price: 170.00,
        img: adidas,
        quantity: 0,
        idUser: []
    },
    {
        id: 2,
        name: 'Adidas Adversary',
        description: 'material sintético para mais ajuste firme nos pés. Entressola: EVA com cloudfoam para ótimo conforto e secagem rápida. Solado: borracha com frisos proporcionando tração e controle multidirecional das passadas durante todas as jogadas.',
        price: 199.99,
        img: adidas2,
        quantity: 0,
        idUser: []
    },
    {
        id: 3,
        name: 'Vibe',
        description: 'O Tênis Vibe Crew Masculino une design e tecnologias para conferir a melhor experiencia em conforto e estilo para skatistas no dia a dia',
        price: 99.99,
        img: vibe,
        quantity: 0,
        idUser: []
    },
    {
        id: 4,
        name: 'Vibe Crew',
        description: 'O Tênis Vibe Crew Masculino une design e tecnologias para conferir a melhor experiencia em conforto e estilo para skatistas no dia a dia. ',
        price: 99.99,
        img: vibe2,
        quantity: 0,
        idUser: []
    },
    {
        id: 5,
        name: 'Bota Coturno',
        description: 'Bota Coturno Adventure SapatoFran com Zíper é confeccionada em sintético, com interior em algodão e espumas, palmilha em EVA revestida com tecido para absorção suor, solado em TR.',
        price: 159.99,
        img: bota,
        quantity: 0,
        idUser: []
    },
    {
        id: 6,
        name: 'Bota Coturno',
        description: 'Bota Coturno SapatoFran Masculino. Confeccionado sintético, recortes peças Laser, costura dupla reforçadas cadarço detalhes. Forrado espumas tecido.',
        price: 179.99,
        img: bota2,
        quantity: 0,
        idUser: []
    },
    {
        id: 7,
        name: 'Meia Térmica',
        description: 'A meia Winter Pro Double Layer é desenvolvida para os dias de frio intenso, inverno e caminhadas na neve. É um produto com estrutura diferenciada e especial',
        price: 140.00,
        img: meia,
        quantity: 0,
        idUser: []
    },
    {
        id: 8,
        name: 'Calça térmica',
        description: 'Calça térmica com tecido leve, perfeitamente ajustada ao corpo (tecnologia Maxyflex). Ideal para usar por baixo de qualquer calção, bermuda ou Calça',
        price: 82.20,
        img: calca,
        quantity: 0,
        idUser: []
    },
    {
        id: 9,
        name: 'Chinelo Nike',
        description: 'Chinelo Nike Solay Thong Masculino',
        price: 70.60,
        img: chinelo,
        quantity: 0,
        idUser: []
    },
    {
        id: 10,
        name: 'Sapatenis',
        description: 'O Sapatenis Masculino exclusivo da Sapatofran são fabricadas com material de couro bovino legítimo, recortes das peças com precisão, costura dupla reforçada',
        price: 89.99,
        img: sapatenis,
        quantity: 0,
        idUser: []
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