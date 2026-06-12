'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useCart } from '@/hooks/useCart';
import { Product, Variation } from '@/types/product';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addItem } = useCart();
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string | number, Variation>
  >({});
  const [quantities, setQuantities] = useState<Record<string | number, number>>(
    {}
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initialVariations: Record<string | number, Variation> = {};
    products.forEach(product => {
      if (
        product.variations &&
        product.variations.length > 0 &&
        !selectedVariations[product.id]
      ) {
        initialVariations[product.id] = product.variations[0];
      }
    });
    if (Object.keys(initialVariations).length > 0) {
      setSelectedVariations(prev => ({ ...prev, ...initialVariations }));
    }
  }, [products]);

  const updateCardQuantity = (productId: string | number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddWithDetails = (product: Product) => {
    const variation = selectedVariations[product.id];
    const qty = quantities[product.id] || 1;

    for (let i = 0; i < qty; i++) {
      addItem(product, variation);
    }

    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ShoppingCart size={64} className="mx-auto text-gray-200" />
          <p className="mt-4 text-xl font-medium text-gray-500">
            Nenhum produto disponível no momento.
          </p>
          <p className="text-gray-400">Por favor, volte mais tarde.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => {
        const hasVariations =
          product.variations && product.variations.length > 0;
        const currentVariation = selectedVariations[product.id];

        const displayPrice = currentVariation
          ? currentVariation.price
          : product.price || 0;

        const displayStock = currentVariation
          ? currentVariation.stock
          : (product.stock ?? 0);

        const isOutOfStock = isMounted && displayStock <= 0;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: (index % 4) * 0.1,
              ease: 'easeOut'
            }}
            className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white transition-all hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <div className="relative h-64 w-full overflow-hidden bg-gray-50">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-200">
                  <ShoppingCart size={48} />
                </div>
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                {displayStock > 0 ? (
                  <span className="rounded-full bg-green-500/90 px-3 py-1 text-[10px] font-black text-white uppercase shadow-sm backdrop-blur-md">
                    Em estoque ({displayStock})
                  </span>
                ) : (
                  <span className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-black text-white uppercase shadow-sm backdrop-blur-md">
                    Esgotado
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-black text-gray-800 transition-colors group-hover:text-orange-600">
                {product.name}
              </h2>

              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
                {product.description ||
                  'Os melhores ingredientes selecionados para você.'}
              </p>

              {hasVariations && (
                <div className="mt-5 space-y-3">
                  <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Escolha a Opção
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variations!.map(v => (
                      <button
                        key={v.id || v.name}
                        onClick={() =>
                          setSelectedVariations(prev => ({
                            ...prev,
                            [product.id]: v
                          }))
                        }
                        className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                          selectedVariations[product.id]?.id === v.id ||
                          selectedVariations[product.id]?.name === v.name
                            ? 'border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-200'
                            : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-1">
                    <button
                      onClick={() => updateCardQuantity(product.id, -1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition-all hover:text-orange-600 active:scale-90"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center text-sm font-black text-gray-700">
                      {quantities[product.id] || 1}
                    </span>
                    <button
                      onClick={() => updateCardQuantity(product.id, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition-all hover:text-orange-600 active:scale-90"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Preço
                    </span>
                    <motion.div
                      key={displayPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-black text-gray-900"
                    >
                      <span className="mr-1 text-sm font-bold text-orange-600">
                        R$
                      </span>
                      {Number(displayPrice).toFixed(2)}
                    </motion.div>
                  </div>
                </div>

                <button
                  disabled={isOutOfStock}
                  onClick={() => handleAddWithDetails(product)}
                  className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all active:scale-[0.98] ${
                    isOutOfStock
                      ? 'cursor-not-allowed bg-gray-300 shadow-none'
                      : 'bg-orange-600 shadow-orange-200 hover:bg-orange-700'
                  }`}
                >
                  <Plus size={18} strokeWidth={3} />
                  Adicionar ao Pedido
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
