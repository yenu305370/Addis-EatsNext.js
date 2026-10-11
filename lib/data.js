export const dishes = [
  { id: 'dish_1', name: 'Royal Doro Wat', price: 450, category: 'Signature', description: 'Traditional slow-cooked spiced chicken stew with organic boiled eggs and artisanal injera.', imageUrl: '/images/Special%20Doro%20Wat.jpg', isFeatured: true, rating: 4.9, prepTime: '25 min' },
  { id: 'dish_2', name: 'Grand Beyaynetu', price: 350, category: 'Vegetarian', description: 'Luxury selection of 12 seasonal organic stews, lentils, and fresh garden vegetables.', imageUrl: '/images/ethiopian-beyaynetu.jpg', isFeatured: true, isFasting: true, rating: 4.8, prepTime: '15 min' },
  { id: 'dish_3', name: 'Gored Gored', price: 500, category: 'Meat', description: 'Tender cubes of beef tossed with mitmita and spiced clarified butter, served Ethiopian-style with injera.', imageUrl: '/images/Tender%20Gored%20Gored.jpg', isFeatured: true, rating: 5.0, prepTime: '20 min' },
  { id: 'dish_4', name: 'Special Shekla Tibs', price: 480, category: 'Meat', description: 'Sizzling ribeye strips served over hot charcoal in a traditional clay vessel.', imageUrl: '/images/ethiopian-shekla-tibs.jpg', isFeatured: true, rating: 4.9, prepTime: '20 min' },
  { id: 'dish_5', name: 'Injera Fitfit', price: 260, category: 'Traditional', description: 'Shredded house injera infused with rich berbere reduction and aromatic garlic.', imageUrl: '/images/ethiopian-injera-fitfit.jpg', isFeatured: false, rating: 4.5, prepTime: '12 min' },
  { id: 'dish_6', name: 'Sautéed Beef Tibs', price: 420, category: 'Meat', description: 'Pan-seared beef cubes tossed with fresh rosemary, jalapeños, and sweet red onions.', imageUrl: '/images/Shekla%20Claypot%20Tibs.jpg', isFeatured: false, rating: 4.7, prepTime: '18 min' },
  { id: 'dish_7', name: 'Artisanal Shiro Wat', price: 240, category: 'Vegetarian', description: 'Velvety sun-dried chickpea puree simmered in copper pots with garlic and berbere.', imageUrl: '/images/Bozena%20Shiro%20Wat.jpg', isFeatured: false, isFasting: true, rating: 4.8, prepTime: '15 min' },
  { id: 'dish_8', name: 'Gomen Kitfo Deluxe', price: 290, category: 'Vegetarian', description: 'Finely chopped collard greens with spiced clarified butter and fresh ayib cheese.', imageUrl: '/images/ethiopian-gomen-kitfo.jpg', isFeatured: false, rating: 4.6, prepTime: '15 min' },
  { id: 'dish_9', name: 'Spicy Misir Wat', price: 230, category: 'Vegetarian', description: 'Red split lentils slow-cooked in rich berbere gravy and virgin sesame oil.', imageUrl: '/images/Spicy%20Misir%20Wat.jpg', isFeatured: false, isFasting: true, rating: 4.7, prepTime: '15 min' },
  { id: 'dish_10', name: 'Turmeric Kik Alicha', price: 210, category: 'Vegetarian', description: 'Mild yellow split peas stewed with fresh ginger, garlic, and organic turmeric.', imageUrl: '/images/ethiopian-kik-alicha.jpg', isFeatured: false, isFasting: true, rating: 4.4, prepTime: '15 min' },
  { id: 'dish_11', name: 'Special Dulet', price: 340, category: 'Meat', description: 'Finely minced lamb tripe, liver, and lean beef sauteed with mitmita and kibbeh.', imageUrl: '/images/ethiopian-kitfo.jpg', isFeatured: false, rating: 4.5, prepTime: '15 min' },
  { id: 'dish_12', name: 'Quanta Firfir', price: 360, category: 'Traditional', description: 'Crispy sun-dried beef jerky simmered in spiced sauce and folded into soft injera.', imageUrl: '/images/ethiopian-quanta-firfir.jpg', isFeatured: false, rating: 4.8, prepTime: '18 min' },
  { id: 'dish_13', name: 'Lake Tana Asa Wat', price: 320, category: 'Seafood', description: 'Fresh tilapia fillets slow-poached in a fragrant tomato-berbere curry sauce.', imageUrl: '/images/ethiopian-asa-wat.jpg', isFeatured: false, rating: 4.6, prepTime: '22 min' },
  { id: 'dish_14', name: 'Tikil Gomen & Dinich', price: 220, category: 'Vegetarian', description: 'A comforting Ethiopian cabbage and potato stew with carrots, gently simmered with turmeric, garlic, and ginger. A satisfying fasting favorite.', imageUrl: '/images/Tikil%20Gomen%20and%20Dinich.jpg', isFeatured: false, isFasting: true, rating: 4.9, prepTime: '18 min' },
  { id: 'dish_15', name: 'Highland Genfo', price: 250, category: 'Breakfast', description: 'Traditional roasted barley porridge with a crater of spiced kibbeh and mitmita.', imageUrl: '/images/ethiopian-genfo.jpg', isFeatured: false, rating: 4.7, prepTime: '15 min' },
  { id: 'dish_16', name: 'Macher', price: 300, category: 'Traditional', description: 'A comforting Ethiopian-style stew simmered with aromatic spices and served with fresh injera.', imageUrl: '/images/ethiopian-quanta-firfir.jpg', isFeatured: false, rating: 4.5, prepTime: '18 min' },
];

export const activeOrders = [
  {
    id: 'ORD-9021',
    userId: 'usr_123',
    customerName: 'Yenenesh Shaka',
    total: 1300,
    status: 'PREPARING',
    createdAt: new Date().toISOString(),
    items: [
      { name: 'Royal Doro Wat', quantity: 2, price: 450 },
      { name: 'Special Prime Kitfo', quantity: 1, price: 400 },
    ],
  },
  {
    id: 'ORD-9022',
    userId: 'usr_456',
    customerName: 'Abebe Bikila',
    total: 350,
    status: 'ON_THE_WAY',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    items: [{ name: 'Grand Beyaynetu', quantity: 1, price: 350 }],
  },
];

export async function getDishes(searchQuery = '', category = 'All') {
  let filtered = [...dishes];

  if (category && category !== 'All') {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    );
  }

  return filtered;
}

export async function getOrdersForUser(userId) {
  return activeOrders.filter((o) => o.userId === userId);
}
