Youtube link:https://www.youtube.com/watch?v=pBpBC4Z0UyU


Changes Overview:
Adding average price per course
1.	Added logic to calculate the average price per section (for each course: Starter, Main, Dessert).
2.	Added a new section under each course to display the average price specific to that course.
3.	Updated styles for the new "average price" text under each section.
•	I added a function to group menu items by their course (Starter, Main, Dessert). This allows us to calculate and display the average price for each section.
- Group the menu items by course
const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.course]) {
    acc[item.course] = [];
  }
  acc[item.course].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

2. Calculating the Average Price per Section:
•	For each course (Starter, Main, Dessert), I calculated the average price and display it under the course name.
const calculateAveragePriceForCourse = (course: string) => {
  const items = groupedItems[course];
  if (items && items.length > 0) {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    return totalPrice / items.length;
  }
  return 0;
};
3. Rendering the Average Price Below Each Section:
•	The average price for each course (Starter, Main, Dessert) is displayed below the course header.
{/* For each course group, display the average price */}
{Object.keys(groupedItems).map((course) => (
  <View key={course} style={styles.section}>
    <Text style={styles.sectionHeader}>{course}</Text>

    {/* Display average price for the course */}
    <Text style={styles.averagePrice}>
      Average Price: R{calculateAveragePriceForCourse(course).toFixed(2)}
    </Text>

    {/* List the menu items for this course */}
    <FlatList
      data={groupedItems[course]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
))}

4. Rendering the Overall Average Price:
•	The original overall average price remains unchanged, and is calculated as:

const averagePrice = totalMenuItems > 0
  ? menuItems.reduce((sum, item) => sum + item.price, 0) / totalMenuItems
  : 0;

The overall average price is displayed here:

<Text style={styles.infoText}>Average Price: R{averagePrice.toFixed(2)}</Text>

5. Styles:
•	I added a new style for the average price per section (averagePrice), and this is wherethe text color in changed.

averagePrice: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: 'green',  
}

On the menu page:
Added this filter button through this code below, the app navigates to the Filter screen and sends menuItems entered in as a parameter to that screen.

<TouchableOpacity
  style={styles.navButton1}
  onPress={() => navigation.navigate('Filter', { menuItems })}>
  <Text style={styles.navButtonText}>{"Filter"}</Text>
</TouchableOpacity>

On the filter Page:
The section that adds the menu items entered from the menu screen is located in the following part of the code:

// Get the menuItems passed from the previous screen via navigation params

const { menuItems } = route.params || {};  // Fallback to empty object if undefined

Here, the menuItems are passed from the previous screen (likely via navigation params) and are accessed through route.params. The code includes a fallback (|| {}) to ensure the app doesn't crash if menuItems are undefined.
The actual rendering of the menu items, which is displayed based on the filtered list of menuItems, happens in this part:

<FlatList
  data={filteredItems}  // This is the filtered list of menu items
  renderItem={renderItem}  // This function renders each individual item
  keyExtractor={(item) => item.id}  // Unique key for each item
  contentContainerStyle={styles.listContainer}  // Style for the list container
/>

In this block, filteredItems holds either all the menu items or a subset filtered by course type (Starter, Main, or Dessert), depending on the selected filter.
•	If the activeFilter state is set (e.g., to 'Starter', 'Main', or 'Dessert'), the list will only display items that match that course type.
•	If no filter is active (i.e., activeFilter is null), all the menu items passed from the previous screen will be displayed.
Each item is rendered using the renderItem function, which displays its name, description, and price.
Key Takeaways:
1.	The menuItems passed from the previous screen are retrieved via route.params.
2.	The filteredItems are then derived based on the active filter (if any).
3.	The FlatList component renders the filtered menu items dynamically.
So, to summarize: the menu items passed from the previous screen are injected into the FlatList component through menuItems, which gets filtered based on the active filter state (activeFilter) before being displayed.

