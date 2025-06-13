import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  level: 'Warga' | 'Juragan' | 'Sultan' | 'Konglomerat';
  favoriteMenu: string;
  totalTransaction: number;
  createdAt: string;
}

interface CustomerState {
  customers: Customer[];
  searchTerm: string;
  sortField: keyof Customer | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
}

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'Odis Rhinehart',
    level: 'Warga',
    favoriteMenu: 'Chicken & Ribs Combo',
    totalTransaction: 194700,
    createdAt: '2023-08-01'
  },
  {
    id: '2',
    name: 'Kris Roher',
    level: 'Warga',
    favoriteMenu: 'Surf & Turf Gift Basket',
    totalTransaction: 631200,
    createdAt: '2023-08-02'
  },
  {
    id: '3',
    name: 'Serenity Fisher',
    level: 'Juragan',
    favoriteMenu: 'Fried Chicken Dinne',
    totalTransaction: 1040920,
    createdAt: '2023-08-03'
  },
  {
    id: '4',
    name: 'Brooklyn Warren',
    level: 'Sultan',
    favoriteMenu: 'Surf & Turf Gift Basket',
    totalTransaction: 730500,
    createdAt: '2023-08-04'
  },
  {
    id: '5',
    name: 'Franco Delort',
    level: 'Juragan',
    favoriteMenu: 'Chicken & Ribs Combo',
    totalTransaction: 96000,
    createdAt: '2023-08-05'
  },
  {
    id: '6',
    name: 'Saul Geoghegan',
    level: 'Juragan',
    favoriteMenu: 'Surf & Turf Gift Basket',
    totalTransaction: 256000,
    createdAt: '2023-08-06'
  },
  {
    id: '7',
    name: 'Alfredo Vetrovs',
    level: 'Juragan',
    favoriteMenu: 'Dark & Stormy',
    totalTransaction: 590080,
    createdAt: '2023-08-07'
  },
  {
    id: '8',
    name: 'Cristofer Vetrovs',
    level: 'Konglomerat',
    favoriteMenu: 'Shaking Beef Tri-Tip',
    totalTransaction: 782600,
    createdAt: '2023-08-08'
  },
  {
    id: '9',
    name: 'Calvin Steward',
    level: 'Konglomerat',
    favoriteMenu: 'BBQ Rib Dinner',
    totalTransaction: 467500,
    createdAt: '2023-08-09'
  },
  {
    id: '10',
    name: 'Calvin Steward',
    level: 'Konglomerat',
    favoriteMenu: 'BBQ Rib Dinner',
    totalTransaction: 467500,
    createdAt: '2023-08-10'
  }
];

const initialState: CustomerState = {
  customers: initialCustomers,
  searchTerm: '',
  sortField: null,
  sortDirection: 'asc',
  currentPage: 1,
  itemsPerPage: 10,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Omit<Customer, 'id' | 'createdAt'>>) => {
      const newCustomer: Customer = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.customers.unshift(newCustomer);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSorting: (state, action: PayloadAction<{ field: keyof Customer; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setSearchTerm,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
} = customerSlice.actions;

export default customerSlice.reducer;