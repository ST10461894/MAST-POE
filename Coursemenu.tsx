import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


interface MenuItem {
  id: string; 
  name: string;
  description: string;
  price: number; 
  course: string;
}


interface CoursemenuProps {
  route: {
    params: {
      menuItems: MenuItem[];
    };  
  };
  navigation: StackNavigationProp<any>; 
}

const Coursemenu: React.FC<CoursemenuProps> = ({ route, navigation }) => {
  const { menuItems } = route.params; // This feature is what receives menuItems from my previous screen

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>Dish Name: {item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: R{item.price}</Text>
    </View>
  );

  
 
  const categorizedMenuItems = {
    Starter: menuItems.filter(item => item.course === 'Starter'),
    Main: menuItems.filter(item => item.course === 'Main'),
    Dessert: menuItems.filter(item => item.course === 'Dessert'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
          <Image
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/efa234ccf71edf969e8915f284ce657b' }} 
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.menuHeaderText}>Complete Menu-Home Page</Text> 
      </View>

      <ScrollView> 
        {Object.keys(categorizedMenuItems).map(course => (
          <View key={course}>
            <Text style={styles.categoryHeader}>{course}</Text>
            <FlatList
              data={categorizedMenuItems[course]}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer} 
              scrollEnabled={false}
            />
          </View>
        ))}
      </ScrollView> 

<TouchableOpacity
  style={styles.navButton1}
  onPress={() => navigation.navigate('Filter', { menuItems })}>
  <Text style={styles.navButtonText}>{"Filter"}</Text>
</TouchableOpacity> 

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Homescreen')}>
        <Text style={styles.navButtonText}>{"Back"}</Text> 
      </TouchableOpacity>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFACD',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'left', 
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10, 
    borderRadius: 10,
  },
  menuHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listContainer: {
    paddingBottom: 20, 
  },
  menuItem: {
    backgroundColor: '#FFEBB7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
    navButton1: {
    backgroundColor: '#FFEBB7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Coursemenu;
