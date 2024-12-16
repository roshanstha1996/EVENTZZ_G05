import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';  
import { db } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { DarkTheme } from '@react-navigation/native';

const EventDetails = ({ route }) => {
  const { eventId } = route.params; // Get the event data passed from HomeScreen
  const [details, setDetails] = useState(null); // State for storing event details
  const [loading, setLoading] = useState(true); // Loading state to show a spinner while data is fetching

  // Function to fetch detailed event data using axios
  const fetchEventDetail = async () => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz`);
      console.log(response.data);
      console.log(response.data.id);
      console.log(response.data.dates.start.localDate+ " " + response.data.dates.start.localTime);
      setDetails(response.data); 
      setLoading(false); 
    } catch (error) {
      console.log("Error fetching event details: ", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchEventDetail();
  }, [eventId]); // Only rerun when the event ID changes

  
  const addToFavourites = async () => {

    try {
        const collectionRef = collection(db, 'EventDB');
    
        // Check if the event already exists in the Firestore collection
        const querySnapshot = await getDocs(collectionRef);
        const existingevent = querySnapshot.docs.find(doc => doc.data().name === details.name); // Check by name or symbol
        
        if (existingevent) {
          alert('This event has already been added to your favorites!!');
          return;
        }

        const eventData = {
            name: details.name,
            type: details.type,
            eventDaate: details.dates.start.localDate+ " " + details.dates.start.localTime
        }
        const docRef = await addDoc(collectionRef, eventData);

        console.log('Event ID: ', docRef.id);
        alert('Added to Favorites!'); 

    } catch (e) {
        console.log('Error adding the crpyto to DB: ', e)
    }
  }

  const handleAddToFavorites = async () => {
    try {
      await addToFavourites(); 
    } catch (error) {
      console.log("Error adding to favorites:", error);
      alert('Failed to add to Favorites.');
    }
  };

  // Show loading spinner while data is fetching
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="navy" />
        <Text>Loading details...</Text>
      </View>
    );
  }

  // Render event details when data is successfully fetched
  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.name}>{details.name}</Text>
        <Text style={styles.text}>Type: {details.type}</Text>
        <Text style={styles.text}>Event Date: {details.dates.start.localDate + " " + details.dates.start.localTime}</Text>
        {/* <Text style={styles.text}>Market Cap: ${details.market_cap_usd}</Text>
        <Text style={styles.text}>Rank: {details.rank}</Text>
        <Text style={styles.text}>24h Change: {details.percent_change_24h}%</Text> */}
      </View>

      {/* Uncomment the below button once handleAddToFavorites is implemented */}
      {/* <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}> */}
      <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsCard: {
    backgroundColor: 'seashell',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'navy',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: 'darkslategray',
  },
  button: {
    backgroundColor: 'navy',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
