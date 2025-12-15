import React from 'react';
import { Home, ShoppingBag, Heart, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, activeTab, setActiveTab }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100">
      
      {/* Logo Area */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500 italic">Snacks Point</h1>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 px-4 space-y-2">
        <button
          onClick={() => setActiveTab('menu')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'menu' ? 'bg-red-50 text-red-500 font-bold' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Home size={20} />
          Menu
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'cart' ? 'bg-red-50 text-red-500 font-bold' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag size={20} />
          Cart
        </button>

        <button
           className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50"
        >
          <Heart size={20} />
          Favorites
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};