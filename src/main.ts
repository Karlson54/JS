// Base type for a product
type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
  };
  
  // Specific type for electronics
  type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warrantyPeriod: string;
  };
  
  // Specific type for clothing
  type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
  };
  
  // Function to find a product by ID
  const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
  };
  
  // Function to filter products by maximum price
  const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
  };
  
  // Type for a cart item
  type CartItem<T> = {
    product: T;
    quantity: number;
  };
  
  // Function to add a product to the cart
  const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    const existingItem = cart.find(item => item.product.id === product.id);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
  
    return cart;
  };
  
  // Function to calculate the total cost of the cart
  const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  
  // Create test data for different product types
  const electronics: Electronics[] = [
    {
      id: 1,
      name: "Phone",
      price: 10000,
      category: 'electronics',
      brand: 'Apple',
      warrantyPeriod: '2 years'
    },
    {
      id: 2,
      name: "Laptop",
      price: 20000,
      category: 'electronics',
      brand: 'Dell',
      warrantyPeriod: '1 year'
    }
  ];
  
  const clothing: Clothing[] = [
    {
      id: 3,
      name: "T-shirt",
      price: 500,
      category: 'clothing',
      size: 'M',
      material: 'cotton'
    },
    {
      id: 4,
      name: "Jeans",
      price: 1500,
      category: 'clothing',
      size: 'L',
      material: 'denim'
    }
  ];
  
  // Testing the functions
  const phone = findProduct(electronics, 1);
  console.log("Found product:", phone);
  
  const affordableElectronics = filterByPrice(electronics, 15000);
  console.log("Products under price 15000:", affordableElectronics);
  
  let cart: CartItem<BaseProduct>[] = [];
  if (phone) {
    cart = addToCart(cart, phone, 1);
  }
  
  const total = calculateTotal(cart);
  console.log("Total cart cost:", total);  