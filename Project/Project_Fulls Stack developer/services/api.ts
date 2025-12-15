import { MOCK_MENU_ITEMS } from '../constants';

// For a beginner app, we can just return the data directly.
// In a real app, you would fetch this from a server.

export const getMenuItems = () => {
  return MOCK_MENU_ITEMS;
};

export const getItemsByCategory = (category: string) => {
  if (category === 'all') {
    return MOCK_MENU_ITEMS;
  }
  // Filter the items based on the category
  return MOCK_MENU_ITEMS.filter(item => item.category === category);
};