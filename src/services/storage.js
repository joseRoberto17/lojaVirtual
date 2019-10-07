import { AsyncStorage } from 'react-native';


export class Storage {

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log(error);
    }

  };

  saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      const get = this.getData(key);
      console.log("Dados salvos " + JSON.stringify(get));
    } catch (error) {
      console.log("Error saving data" + error);
    }

  };

  removeData = async (key, itemName) => {
    try {
      let dataJSON = await this.getData(key);
      let dataArray = JSON.parse(dataJSON);

      alteredData = dataArray.filter(function (e) {
        return e.name !== itemName

      })
      this.saveData(key,JSON.stringify(alteredData));
      console.log("Dados alterados com sucesso " + JSON.stringify(alteredData));
    }
    catch (error) {
      console.log(error)
    }
  };


  removeAll = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Dados removidos " + this.getData(key));
    }
    catch(error) {
      console.log(error)
    }
  }
} 