import { supabase } from '@/lib/supabase';
import { Category, Product } from '@/types/product';

import Cart from './components/Cart';
import { CategoryFilter } from './components/CategoryFilter';
import Header from './components/Header';

export const revalidate = 60;

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
  return data || [];
}

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      variations:product_variations(*)
    `
    )
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  return data || [];
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      <Header />

      <main className="relative z-10 container mx-auto -mt-12 px-4">
        <div className="rounded-[2.5rem] border border-orange-50 bg-white p-6 shadow-2xl shadow-orange-900/5 md:p-10">
          <CategoryFilter categories={categories} products={products} />
        </div>
      </main>

      <Cart />

      <footer className="mt-20 border-t border-gray-100 py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="font-bold text-gray-500">Linda Menu</p>
          <p className="mt-1 text-sm text-gray-400" suppressHydrationWarning>
            © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
