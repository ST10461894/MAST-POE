import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal, ScrollView } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

interface AppProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const App: React.FC<AppProps> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Meat Safari', description: 'Lamb, Beef and Turkey pieces grilled the Hot-Pot way', price: 40, course: 'Starter' },
    { id: '2', name: 'Rice & Chicken Stew', description: 'Jollof rice prepared alongside delicious peppered chicken stew served with a side of plantains.', price: 100, course: 'Main' },
    { id: '3', name: 'Cheese-cake Fondo', description: 'Delicious cheese-cake topped off with fresh cherries and creamy vanilla ice-cream.', price: 50, course: 'Dessert' },
  ]);

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.course]) {
      acc[item.course] = [];
    }
    acc[item.course].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const calculateAveragePrice = (items: MenuItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return total / items.length;
  };

  const totalMenuItems = menuItems.length;


  const averagePrice = totalMenuItems > 0
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / totalMenuItems
    : 0;

  // State variables
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newDishName, setNewDishName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCourse, setNewCourse] = useState<string>('Starter');
  const [newPrice, setNewPrice] = useState<string>('');

  
  const addNewItem = () => {
    const newItem: MenuItem = {
      id: (menuItems.length + 1).toString(),
      name: newDishName,
      description: newDescription,
      course: newCourse,
      price: parseFloat(newPrice),
    };
    setMenuItems([...menuItems, newItem]);
    setModalVisible(false);
    setNewDishName('');
    setNewDescription('');
    setNewPrice('');
    setNewCourse('Starter'); 
  };

  //This function removes an item by its id
  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };


  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>Dish Name: {item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.menuFooter}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>{item.course}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>Price: R{item.price}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <Text style={styles.removeButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
          <Image source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/efa234ccf71edf969e8915f284ce657b' }} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hot-Pot Menu Items</Text>
      </View>
      <Image source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/697d48e15dae8571db6412f475946b4d' }} style={styles.image} />
       
    
      <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Coursemenu', { menuItems })}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Total Prepared Items: {totalMenuItems}</Text>
        <Text style={styles.infoText}>Total Average Price: R{averagePrice.toFixed(2)}</Text>
      </View>

      <Text style={styles.menuHeaderText}>Menu (Prepared)</Text>

      <ScrollView>
        {Object.keys(groupedItems).map((course) => {
          const items = groupedItems[course];
          const avgPrice = calculateAveragePrice(items);

          return (
            <View key={course} style={styles.section}>
              <Text style={styles.sectionHeader}>{course}</Text>
              <Text style={styles.averagePrice}>Average Price: R{avgPrice.toFixed(2)}</Text>

              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          );
        })}

        
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>

      
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Dish</Text>
            <TextInput style={styles.input} placeholder="Dish Name" value={newDishName} onChangeText={setNewDishName} />
            <TextInput style={styles.input} placeholder="Description" value={newDescription} onChangeText={setNewDescription} />
            <View style={styles.courseContainer}>
              {['Starter', 'Main', 'Dessert'].map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[styles.courseButton, newCourse === course && styles.selectedCourseButton]}
                  onPress={() => setNewCourse(course)}
                >
                  <Text style={styles.courseButtonText}>{course}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newPrice}
              onChangeText={setNewPrice}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={addNewItem}>
              <Text style={styles.modalButtonText}>Add Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFACD',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 17,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    backgroundColor: '#FFEBB7',
    padding: 7,
    paddingHorizontal: 0.1,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  averagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF8C00',
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
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  removeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFACD',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold'
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  courseButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedCourseButton: {
    backgroundColor: '#FFA500',
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
