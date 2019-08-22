import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';
import Description from './pages/description';
import Cart from './pages/cart';

export default createStackNavigator({
  Main,
  Description,
  Cart
},{
  navigationOptions: {}
});