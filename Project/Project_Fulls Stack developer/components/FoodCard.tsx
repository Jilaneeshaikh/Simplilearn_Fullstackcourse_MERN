import React from 'react';
import { Plus, Star, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      
      {/* Image Area */}
      <div className="relative mb-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-40 object-cover rounded-xl"
        />
        <button 
          onClick={() => onToggleWishlist(item.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
        >
           <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
      </div>

      {/* Info Area */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-700">
            <Star size={12} className="fill-green-700" />
            {item.rating}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-gray-800">${item.price}</span>
          
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};