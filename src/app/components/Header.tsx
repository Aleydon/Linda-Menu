'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, UtensilsCrossed } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="relative overflow-hidden bg-orange-600 pt-16 pb-24 text-white">
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-orange-600 shadow-xl">
              <UtensilsCrossed size={40} />
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Linda <span className="text-orange-200">Menu</span>
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden bg-orange-600 pt-16 pb-24 text-white">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-orange-400"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-white"
      />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-orange-600 shadow-xl"
          >
            <UtensilsCrossed size={40} />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight md:text-6xl"
          >
            Linda <span className="text-orange-200">Menu</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-lg font-medium text-orange-50 opacity-90 md:text-xl"
          >
            Sabores incríveis entregues com carinho. Escolha seus favoritos e
            peça agora!
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold"
          >
            <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-700/50 px-5 py-2 backdrop-blur-md">
              <Clock size={16} />
              <span>30-45 min</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-700/50 px-5 py-2 backdrop-blur-md">
              <MapPin size={16} />
              <span>Entrega em toda região</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
