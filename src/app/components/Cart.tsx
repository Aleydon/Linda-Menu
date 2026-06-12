'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCart } from '@/hooks/useCart';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  // Evita erros de hidratação com o Zustand
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';

  const handleCheckout = () => {
    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';

    items.forEach(item => {
      const price = item.selectedVariation?.price ?? item.price;
      message += `*${item.quantity}x ${item.name}*`;
      if (item.selectedVariation) {
        message += ` (${item.selectedVariation.name})`;
      }
      message += ` - R$ ${(price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: R$ ${totalPrice().toFixed(2)}*`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Botão Flutuante do Carrinho */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-8 bottom-8 z-50 flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-600 text-white shadow-2xl shadow-orange-600/40 transition-colors hover:bg-orange-700"
      >
        <ShoppingCart size={30} strokeWidth={2.5} />
        {totalItems() > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-2xl border-4 border-white bg-green-500 text-[10px] font-black shadow-lg"
          >
            {totalItems()}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-60 bg-gray-900/60 backdrop-blur-md"
            />

            {/* Drawer Lateral */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-70 h-full w-full max-w-md overflow-hidden bg-white shadow-2xl"
            >
              <div className="flex h-full flex-col">
                {/* Header do Carrinho */}
                <div className="flex items-center justify-between border-b border-gray-50 p-8">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-800">
                      Seu Pedido
                    </h2>
                    <p className="mt-1 text-sm font-medium text-gray-400">
                      {totalItems()} itens selecionados
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-gray-50 p-3 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-800"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Lista de Itens */}
                <div className="no-scrollbar flex-1 overflow-y-auto p-8">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
                        <ShoppingCart size={40} className="text-orange-200" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Carrinho vazio
                      </h3>
                      <p className="mt-2 max-w-50 text-gray-400">
                        Adicione itens do cardápio para começar!
                      </p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-8 text-sm font-extrabold tracking-widest text-orange-600 uppercase transition-colors hover:text-orange-700"
                      >
                        Ver Cardápio
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {items.map(item => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={`${item.id}-${item.selectedVariation?.name}`}
                          className="group flex gap-5"
                        >
                          <div className="flex-1">
                            <h3 className="font-extrabold text-gray-800 transition-colors group-hover:text-orange-600">
                              {item.name}
                            </h3>
                            {item.selectedVariation && (
                              <p className="mt-1 text-[10px] font-black tracking-widest text-orange-500 uppercase">
                                {item.selectedVariation.name}
                              </p>
                            )}
                            <p className="mt-2 text-lg font-black text-gray-900">
                              R${' '}
                              {Number(
                                item.selectedVariation?.price ?? item.price ?? 0
                              ).toFixed(2)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-1.5">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                    item.selectedVariation?.name
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition-all hover:text-orange-600 hover:shadow-md"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-4 text-center text-sm font-black text-gray-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                    item.selectedVariation?.name
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition-all hover:text-orange-600 hover:shadow-md"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(
                                  item.id,
                                  item.selectedVariation?.name
                                )
                              }
                              className="mt-3 p-1 text-gray-300 transition-colors hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer do Carrinho (Total e Botão) */}
                {items.length > 0 && (
                  <div className="space-y-6 border-t border-gray-100 bg-gray-50 p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Subtotal
                      </span>
                      <span className="font-bold text-gray-400">
                        R$ {totalPrice().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black tracking-tight text-gray-800">
                        Total
                      </span>
                      <span className="text-3xl font-black tracking-tight text-orange-600">
                        R$ {totalPrice().toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="group flex w-full items-center justify-center gap-3 rounded-4xl bg-green-500 py-5 text-xl font-black text-white shadow-2xl shadow-green-500/20 transition-all hover:bg-green-600 active:scale-[0.98]"
                    >
                      <MessageCircle
                        size={24}
                        strokeWidth={2.5}
                        className="group-hover:animate-bounce"
                      />
                      Finalizar Pedido
                    </button>
                    <p className="text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Você será levado ao WhatsApp
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
