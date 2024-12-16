import { 
  useCallback,
  useState,
  useEffect} from "react";
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput, 
  TouchableOpacity, 
  Alert, 
  FlatList,
  Image, 
  Button,
  StatusBar} from "react-native";
  import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

//this is homescreen view 
const HomeScreen = ({navigation}) => {

  const [eventsList, seteventsList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchAllEvents = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/tickers/?start=0&limit=50`);
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&size=10&page=1`);
      // console.log(response.data);
      console.log(response.data._embedded.events);
      seteventsList(response.data._embedded.events);
    } catch (error) {
      console.log("Error fetching events: ", error);
    }
  }
  
  
  useEffect(() => {
    fetchAllEvents();
  },[]);

  const showeventDetails = (item) => {
    navigation.navigate('EventDetails', { eventId: item.id });
  };
  
  const Item = ({item}) => (
    <TouchableOpacity onPress={() => showeventDetails(item)}>
      <View style={styles.mainView}>
        <Image
          style={styles.productImage}
          source={require('../assets/eventcurrency.png')}
        />

        <View style= {styles.subViewContainer}>
          <View style={styles.subView}>
            <Text 
              numberOfLines={2}
              ellipsizeMode='tail'
              style={styles.productTitle}>
                {item.name}
            </Text>
            {/* <Text style={styles.productPrice}>${item.price_usd}</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventsList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Item item={item} />}
        />

      <Button title="My Favourite" onPress={() => navigation.navigate('MyFavourite')} />

    </View>
  );
}

export default HomeScreen;

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'seashell',
    padding: 10,
    margin: 10,
    maxWidth: '100%'
  },
  productImage: {
    width: 64,
    height: 64,
    resizeMode: 'cover'
  },
  subViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    gap: 10
  },
  subView: {
    flex: 1,
    height: '50%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'sienna'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: 'mediumseagreen'
  },
});