/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Star, 
  Coffee, 
  Utensils, 
  Leaf, 
  Sun,
  Dog,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  name: string;
  description: string;
  price: string;
  isFavorite?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

// --- Data ---
const MENU_DATA: MenuSection[] = [
  {
    id: 'brunch',
    title: 'Desayuno & Brunch',
    items: [
      { name: 'Huevos Benedictinos', description: 'Nuestra especialidad: huevos pochados sobre pan artesanal, salsa holandesa y aguacate.', price: 'Consultar', isFavorite: true },
      { name: 'Avocado Toast Completo', description: 'Aguacate, tomate, jamón serrano y huevo sobre pan de masa madre.', price: 'Consultar' },
      { name: 'Bagel con Salmón', description: 'Queso crema, salmón ahumado, alcaparras y cebolla morada.', price: 'Consultar' },
      { name: 'Croissant Trencat', description: 'Croissant artesanal relleno de jamón serrano y tomate natural.', price: 'Consultar' },
    ]
  },
  {
    id: 'tapas',
    title: 'Tapas & Raciones',
    items: [
      { name: 'Ensalada de Salmón', description: 'Mix de brotes tiernos, salmón premium, frutos secos y vinagreta cítrica.', price: 'Consultar' },
      { name: 'Tabla de Quesos y Jamón', description: 'Selección de productos locales con pan con tomate.', price: 'Consultar' },
      { name: 'Tosta de Hummus', description: 'Hummus casero, semillas de sésamo y aceite de oliva virgen extra.', price: 'Consultar', isFavorite: true },
    ]
  },
  {
    id: 'postres',
    title: 'Postres & Repostería',
    items: [
      { name: 'Red Velvet Cake', description: 'Tarta casera legendaria con frosting de queso suave.', price: 'Consultar', isFavorite: true },
      { name: 'Ensaimada Mallorquina', description: 'Traída y horneada con el cariño de siempre.', price: 'Consultar' },
      { name: 'Bizcocho Casero del Día', description: 'Pregunta por nuestro sabor de hoy (Limón, Chocolate o Naranja).', price: 'Consultar' },
    ]
  },
  {
    id: 'bebidas',
    title: 'Café & Bebidas',
    items: [
      { name: 'Specialty Coffee', description: 'Espresso, Cappuccino o Flat White con granos seleccionados.', price: 'Consultar' },
      { name: 'Zumo de Naranja Natural', description: 'Recién exprimido con las mejores naranjas de Valencia.', price: 'Consultar', isFavorite: true },
      { name: 'Té Matcha Latte', description: 'Té verde premium con leche o bebida vegetal.', price: 'Consultar' },
    ]
  }
];

const REVIEWS = [
  {
    name: "Visitante TripAdvisor",
    text: "Lo encontramos por casualidad paseando. El menú genial, comida muy rica y personal atento. ¡Muy recomendado!",
    rating: 5
  },
  {
    name: "Google Reviewer",
    text: "¡Mi café favorito en Valencia! Un gran lugar para comer comida buena y original. Servicio siempre agradable.",
    rating: 5
  },
  {
    name: "Marta S.",
    text: "Encantador café en el corazón de Valencia. Sentarse fuera es pura relajación. El Avocado Toast está presentado precioso.",
    rating: 5
  },
  {
    name: "Local Regular",
    text: "Servicio rápido y amable e igual de importante: café realmente bueno de especialidad.",
    rating: 5
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('brunch');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-gray-800">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="cursor-pointer flex flex-col leading-tight"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={`text-2xl font-serif italic ${isScrolled ? 'text-brand-terracotta' : 'text-white'}`}>Trencat</span>
            <span className={`text-[10px] uppercase tracking-widest ${isScrolled ? 'text-brand-olive' : 'text-brand-cream'}`}>Dolç i Salat</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['menu', 'about', 'reviews', 'visit'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm font-medium hover:text-brand-terracotta transition-colors ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                {item === 'visit' ? 'Visítanos' : item === 'about' ? 'Sobre Nosotros' : item === 'reviews' ? 'Opiniones' : 'Carta'}
              </button>
            ))}
            <a 
              href="tel:+34963122389"
              className="bg-brand-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-brand-deep-orange transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Phone size={16} />
              963 12 23 89
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className={isScrolled ? 'text-brand-terracotta' : 'text-white'} size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-serif italic text-brand-terracotta">Trencat</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-olive">Dolç i Salat</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} className="text-brand-terracotta" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6 text-center">
              <button onClick={() => scrollToSection('menu')} className="text-2xl font-serif text-brand-olive">Nuestra Carta</button>
              <button onClick={() => scrollToSection('about')} className="text-2xl font-serif text-brand-olive">Sobre Nosotros</button>
              <button onClick={() => scrollToSection('reviews')} className="text-2xl font-serif text-brand-olive">Opiniones</button>
              <button onClick={() => scrollToSection('visit')} className="text-2xl font-serif text-brand-olive">Visítanos</button>
            </div>

            <div className="mt-auto pt-12 text-center">
              <a 
                href="tel:+34963122389"
                className="inline-flex bg-brand-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold items-center gap-3 w-full justify-center shadow-xl"
              >
                <Phone size={20} />
                Llamar a Reservar
              </a>
              <p className="mt-4 text-gray-500 text-sm">Calle Trench 21, Valencia</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Gradient & Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta via-brand-deep-orange to-brand-olive">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 leading-tight">
              El Sabor de Valencia <br />
              <span className="italic">en Cada Bocado</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 opacity-90 max-w-2xl mx-auto">
              Sweet & Savoury in the Heart of Valencia.
              <br />
              <span className="font-semibold text-brand-saffron">Desayuno · Brunch · Tapas · Café</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('visit')}
                className="group bg-brand-saffron text-brand-deep-orange px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Reservar Mesa
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Ver Menú ↓
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-brand-saffron">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-semibold tracking-wide text-white">
                4.6 en TripAdvisor · +200 reseñas
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <div className="w-px h-12 bg-white/20">
            <motion.div 
              animate={{ height: ['0%', '100%', '0%'] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full bg-white/60"
            />
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white py-12 border-b border-brand-cream/50 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Dog, text: 'Dog Friendly', sub: 'Tus mascotas son bienvenidas' },
              { icon: Leaf, text: 'Opciones Veganas', sub: 'Y alternativas saludables' },
              { icon: Sun, text: 'Terraza Exterior', sub: 'Disfruta del sol valenciano' },
              { icon: MapPin, text: 'Centro Histórico', sub: 'A pasos del Mercat Central' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-brand-cream flex items-center justify-center text-brand-olive mb-4 group-hover:bg-brand-olive group-hover:text-white transition-all duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-bold text-lg text-brand-olive">{feature.text}</h3>
                <p className="text-sm text-gray-500">{feature.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-terracotta font-bold uppercase tracking-widest text-sm"
          >
            Artesanal y Fresco
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mt-2 mb-6"
          >
            Nuestra Carta
          </motion.h2>
          <div className="w-24 h-1 bg-brand-saffron mx-auto mb-10"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 overflow-x-auto scrollbar-hide pb-2">
          {MENU_DATA.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === section.id 
                  ? 'bg-brand-olive text-white shadow-lg scale-105' 
                  : 'bg-white text-brand-olive hover:bg-brand-cream'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8"
        >
          {MENU_DATA.find(s => s.id === activeTab)?.items.map((item, idx) => (
            <div 
              key={idx}
              className="group flex justify-between gap-4 border-b border-dotted border-gray-300 pb-4 relative"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-xl group-hover:text-brand-terracotta transition-colors">
                    {item.name}
                  </h4>
                  {item.isFavorite && (
                    <span className="bg-brand-saffron/20 text-brand-deep-orange text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
              <div className="text-brand-olive font-bold text-sm">
                {item.price}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 italic mb-6">
            "Reserva tu mesa — somos un local pequeño con mucho alma y solemos llenar rápido"
          </p>
          <a 
            href="tel:+34963122389"
            className="inline-flex border-2 border-brand-terracotta text-brand-terracotta px-10 py-4 rounded-full font-bold hover:bg-brand-terracotta hover:text-white transition-all shadow-md active:scale-95"
          >
            Llamar para Reservar
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-brand-olive text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-brand-saffron font-bold uppercase tracking-widest text-sm">Nuestra Historia</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-8 leading-tight">
              Un Rincón con Alma en <br />
              <span className="italic">El Mercat</span>
            </h2>
            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                <strong>Trencat Dolç i Salat</strong> es mucho más que un café. Situado en la emblemática Calle Trench, somos un pequeño refugio luminoso concebido para quienes aprecian lo auténtico y artesanal.
              </p>
              <p>
                El nombre "Trencat" no es casual: hace honor a la calle en la que nos encontramos, históricamente un <em>trench</em> o atajo en el corazón de Valencia. Al igual que ese camino secreto, nosotros somos una ruta directa hacia el placer culinario.
              </p>
              <p>
                Aquí, locales, turistas y sus amigos de cuatro patas 🐾 se mezclan en una atmósfera vibrante donde los huevos benedictinos conviven con el mejor café de especialidad y nuestra legendaria Red Velvet.
              </p>
            </div>
            <div className="mt-10 flex gap-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-serif text-brand-saffron">4.6</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">TripAdvisor</span>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-serif text-brand-saffron">98</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Sluurpy Index</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-terracotta to-brand-saffron rounded-2xl rotate-3 shadow-2xl"></div>
              <div className="absolute inset-0 bg-brand-cream rounded-2xl -rotate-3 overflow-hidden shadow-2xl flex items-center justify-center p-8 border-4 border-white">
                {/* Styled Placeholder for Atmospheric Photo */}
                <div className="w-full h-full bg-gradient-to-br from-brand-terracotta/40 to-brand-olive/40 rounded-lg flex flex-col items-center justify-center text-brand-olive text-center p-6 border border-brand-olive/20">
                  <Sun size={60} className="mb-4 opacity-30" />
                  <p className="font-serif italic text-xl">Imagen del Interior:<br />Luz natural y colores cálidos</p>
                  <p className="text-xs uppercase tracking-tighter mt-4 opacity-50">Auténtico Valenciano</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex text-brand-saffron">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="font-bold text-gray-700">4.6 / 5 sobre 200+ opiniones</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-cream flex flex-col"
            >
              <div className="flex text-brand-saffron mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-6 flex-1">"{review.text}"</p>
              <div className="pt-4 border-t border-gray-100 font-bold text-brand-olive">
                - {review.name}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-10">Encuéntranos</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-brand-terracotta">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Dirección</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Calle Trench 21, 46001 Valencia<br />
                    (El Mercat, Casco Histórico)
                  </p>
                  <a 
                    href="https://www.google.com/maps?q=Calle+Trench+21+Valencia" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-brand-terracotta font-bold text-sm underline hover:text-brand-deep-orange transition-colors"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-brand-terracotta">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Horario</h4>
                  <p className="text-gray-600 leading-relaxed uppercase tracking-wide text-sm font-medium">
                    Lunes – Viernes: 08:30 – 17:00<br />
                    <span className="text-brand-olive">Fines de Semana: Consultar Redes Sociales</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-brand-terracotta">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Contacto</h4>
                  <p className="text-gray-600 mb-2">Para reservas y consultas:</p>
                  <a href="tel:+34963122389" className="text-2xl font-bold text-brand-terracotta hover:text-brand-deep-orange transition-colors animate-pulse">
                    +34 963 12 23 89
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-brand-olive text-white rounded-xl shadow-lg w-fit">
                <Dog className="text-brand-saffron" size={24} />
                <span className="font-bold">Dogs Always Welcome 🐾</span>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.8242133282216!2d-0.3794695!3d39.4740156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048b29df99cbd%3A0xe67db127116719ba!2sC.%20del%20Trench%2C%2021%2C%20Ciutat%20Vella%2C%2046001%20Val%C3%A8ncia!5e0!3m2!1sen!2ses!4v1714482700000!5m2!1sen!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Trencat Location"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-olive py-16 px-6 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col leading-tight mb-4">
              <span className="text-3xl font-serif italic text-brand-saffron">Trencat</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Dolç i Salat</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs mb-6">
              El rincón artesanal de Valencia donde lo dulce y lo salado se encuentran.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-saffron hover:text-brand-deep-orange transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-saffron hover:text-brand-deep-orange transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="font-bold text-brand-saffron uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><button onClick={() => scrollToSection('menu')} className="hover:text-brand-saffron transition-colors">Carta Completa</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-brand-saffron transition-colors">Nuestra Historia</button></li>
              <li><button onClick={() => scrollToSection('reviews')} className="hover:text-brand-saffron transition-colors">Opiniones</button></li>
              <li><button onClick={() => scrollToSection('visit')} className="hover:text-brand-saffron transition-colors">Localización</button></li>
            </ul>
          </div>

          {/* Visit Col */}
          <div>
            <h4 className="font-bold text-brand-saffron uppercase tracking-widest text-xs mb-6">Visítanos</h4>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">
              Calle Trench 21<br />
              46001 Valencia, España
            </p>
            <a href="tel:+34963122389" className="text-brand-saffron font-bold text-lg hover:underline transition-all">
              +34 963 12 23 89
            </a>
          </div>

          {/* Social Links Col */}
          <div className="flex flex-col items-center md:items-start">
             <h4 className="font-bold text-brand-saffron uppercase tracking-widest text-xs mb-6">Valencian Heart</h4>
             <p className="text-xs opacity-50 text-center md:text-left italic">
               "Benvinguts a casa vostra. Esperem que disfruteu d'un moment dolç i salat amb nosaltres."
             </p>
             <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
               <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">
                 <Utensils size={10} />
                 BRUNCH
               </div>
               <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">
                 <Coffee size={10} />
                 CAFÉ
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Trencat Dolç i Salat. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-40">
            <a href="#" className="hover:opacity-100 transition-opacity">Aviso Legal</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Políticas de Privacidad</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] bg-brand-terracotta text-white p-4 rounded-full shadow-2xl hover:bg-brand-deep-orange transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
