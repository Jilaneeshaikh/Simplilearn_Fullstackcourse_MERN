import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { FoodCard } from './FoodCard';
import { CATEGORIES } from '../constants';
import { getItemsByCategory } from '../services/api';
import { MenuItem, CartItem, User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
    user, 
    onLogout, 
    cart, 
    addToCart,
    wishlist,
    toggleWishlist
}) => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get items directly (Synchronous) - simpler for beginners
  const menuItems = getItemsByCategory(selectedCategory);

  // Filter items based on search
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for Navigation */}
      <Sidebar 
        onLogout={onLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}
          </h1>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="bg-white p-2 rounded-full border flex items-center gap-2 px-4 shadow-sm">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text"
                placeholder="Search food..."
                className="outline-none text-sm w-40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => setActiveTab('cart')}
              className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow hover:bg-red-600 transition"
            >
              <ShoppingCart size={20} />
              <span>{cartCount}</span>
            </button>
          </div>
        </header>

        {/* Content Switcher */}
        {activeTab === 'cart' ? (
          // --- CART VIEW ---
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">${item.price * item.quantity}</p>
                  </div>
                ))}
                
                <div className="pt-4 flex justify-between items-center font-bold text-xl">
                  <span>Total Amount:</span>
                  <span className="text-red-500">${cartTotal}</span>
                </div>
                
                <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600">
                  Checkout
                </button>
              </div>
            )}
            
            <button onClick={() => setActiveTab('menu')} className="mt-6 text-sm text-gray-500 hover:text-red-500 underline">
              &larr; Back to Menu
            </button>
          </div>

        ) : (
          // --- MENU VIEW ---
          <div>
            {/* Categories Row */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.has(item.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};