import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JokeCard from './jokeCard';

const HomeScreen = () => {

  const [joke, setJoke] = useState(null);
  const [err, setErr] = useState(null);
  const [reload, setReload] = useState(false);

  const loadJoke = () => {
    axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist")
    .then((res)=>{
      let jokeObject = {
        id:res.data.id,
      }
      jokeObject['joke'] = res.data.type === "single" ? res.data.joke : res.data.setup + "\n" + res.data.delivery;
      setJoke(jokeObject);
      setErr(null);
    })
    .catch((err)=>setErr(err));
  }

  useEffect(()=>{
    loadJoke();
  },[reload])

  const addToFavorites = async (value) => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = JSON.parse(favorites);
      if (favorites == null) {
        favorites = new Array(1).fill(value);
      }
      else {
        if (favorites.findIndex((item) => {return item.id === value.id}) === -1) {
          favorites.push(value);
        }
        else {
          return
        }      
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      // saving error
    }
  }

  return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
        {joke && <JokeCard callingScreen={"Home"} jokeItem={joke} handleUserAction={addToFavorites} />}
        {!joke && <Text style={{fontSize: 17, fontWeight: "bold", padding: 20, }} >Loading a Joke for you....</Text>}
        <Button color="#CD7F32" onPress={()=>setReload(!reload)} title="View another Joke"/>
      </View>
  )
}

export default HomeScreen;