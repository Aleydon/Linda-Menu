'use client';

import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Category, Product } from '@/types/product';

import ProductList from './ProductList';

interface CategoryFilterProps {
  categories: Category[];
  products: Product[];
}

export function CategoryFilter({ categories, products }: CategoryFilterProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategoryId
        ? product.category_id === selectedCategoryId
        : true;

      const matchesSearch =
        searchTerm.trim() === ''
          ? true
          : product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.variations?.some(v =>
              v.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategoryId, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Menu (Horizontal Scroll) */}
        <div className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`rounded-2xl px-6 py-3 text-sm font-black whitespace-nowrap transition-all ${
              selectedCategoryId === null
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`rounded-2xl px-6 py-3 text-sm font-black whitespace-nowrap transition-all ${
                selectedCategoryId === category.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border-none bg-gray-50 py-3 pr-10 pl-11 text-sm font-bold text-gray-700 transition-all outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      {searchTerm && (
        <p className="text-sm font-medium text-gray-500">
          Resultados para &quot;
          <span className="font-bold text-orange-600">{searchTerm}</span>&quot;:
          <span className="ml-1 text-gray-400">
            {filteredProducts.length} encontrados
          </span>
        </p>
      )}

      {/* Product List */}
      <ProductList products={filteredProducts} />
    </div>
  );
}
