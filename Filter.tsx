import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp, RouteProp } from '@react-navigation/stack';


interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}


interface FilterProps {
  route: RouteProp<any, any>;  
  navigation: StackNavigationProp<any>;  
}

const Filter: React.FC<FilterProps> = ({ route, navigation }) => {
  
  const { menuItems } = route.params || {};  

  // This feature will show an error message if my menu items are missing
  if (!menuItems) {
    return (
      <View style={styles.container}>
        <Text>Error: menuItems are missing!</Text>
      </View>
    );
  }

  const [activeFilter, setActiveFilter] = useState<string | null>(null);


  const filteredItems = activeFilter
    ? menuItems.filter(item => item.course === activeFilter)
    : menuItems;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>Dish Name: {item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: R{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuHeaderText}>Filtered Menu</Text>
      </View>

      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Starter' && styles.activeButton]}
          onPress={() => setActiveFilter(activeFilter === 'Starter' ? null : 'Starter')}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Main' && styles.activeButton]}
          onPress={() => setActiveFilter(activeFilter === 'Main' ? null : 'Main')}
        >
          <Text style={styles.filterButtonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Dessert' && styles.activeButton]}
          onPress={() => setActiveFilter(activeFilter === 'Dessert' ? null : 'Dessert')}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Back</Text>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  menuHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FFEBB7',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Filter;
