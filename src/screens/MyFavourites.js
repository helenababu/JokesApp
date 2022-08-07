import React, { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JokeCard from './jokeCard';

const MyFavorites = () => {

  const [favJokes, setfavJokes] = useState(null);

  const getData = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      setfavJokes(JSON.parse(favorites))
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(()=>{
    getData();
  },[])

  const removeFromFavorites = async (value) => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = JSON.parse(favorites);
      if (favorites == null) {
        //do nothing
      }
      else {
        var unselect = favorites.findIndex((item) => {return item.id === value.id});
        favorites.splice(unselect, 1);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setfavJokes(favorites)
    } catch (e) {
      // saving error
    }
  }

  const removeAllFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('favorites');
      setfavJokes(null)
    } catch (e) {
      // saving error
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!favJokes && <Text style={{marginTop: 30, fontSize: 18}}>Add jokes to Favorites to view them here!</Text>}
      <ScrollView>
        <View>
          {favJokes && favJokes.map((item) => {
            return ( <JokeCard key={item.id} jokeItem={item} handleUserAction={removeFromFavorites}/>)
          })}
        </View>
      </ScrollView>
      {(favJokes && favJokes.length > 0) && <Button color="#CD7F32" onPress={removeAllFromStorage} title="Empty MyFavorites"/>}
    </View>
  )
}

export default MyFavorites;