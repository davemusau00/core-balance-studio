import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, X, Smartphone, ArrowRight, Package, Star, Tag } from 'lucide-react';

const PRODUCTS = [
  { id: 'p1', name: 'Pilates Grip Socks', category: 'Accessories', price: 850, image: 'https://images.unsplash.com/photo-1582042702658-7a45c8b6f9e2?w=600&q=80', badge: 'Bestseller', rating: 4.9, reviews: 214, description: 'Anti-slip ToeSox designed for Reformer and Mat Pilates. Breathable, durable, and machine washable.' },
  { id: 'p2', name: 'Core Balance Water Bottle', category: 'Accessories', price: 1800, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', badge: 'Studio Favourite', rating: 4.8, reviews: 87, description: 'Insulated 500ml stainless steel bottle. Keeps water cold for 12 hours. Laser-engraved studio logo.' },
  { id: 'p3', name: 'Pilates Mat (6mm)', category: 'Equipment', price: 4500, image: 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=600&q=80', badge: 'New', rating: 4.7, reviews: 43, description: 'Thick 6mm non-slip mat with alignment lines. Ideal for home practice between studio sessions.' },
  { id: 'p4', name: 'Resistance Band Set (3 levels)', category: 'Equipment', price: 2200, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80', badge: '', rating: 4.6, reviews: 61, description: 'Set of 3 latex resistance bands: light, medium, and heavy. Perfect for activation and mobility work.' },
  { id: 'p5', name: 'Branded Studio Towel', category: 'Accessories', price: 1200, image: 'https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=600&q=80', badge: 'Low Stock', rating: 4.5, reviews: 32, description: 'Quick-dry microfiber towel with the Core Balance logo. Compact and lightweight for studio use.' },
  { id: 'p6', name: 'Core Balance Tote Bag', category: 'Accessories', price: 1500, image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80', badge: '', rating: 4.8, reviews: 55, description: 'Canvas tote with an interior zipper pocket. Wide enough for a mat and full studio kit.' },
];

const CATEGORIES = ['All', 'Accessories', 'Equipment'];

interface CartItem { id: string; name: string; price: number; qty: number }

export const WebstorePage: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const filtered = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      return existing
        ? prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.id !== id));

  const checkout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      setCart([]);
      setCartOpen(false);
      setCheckoutDone(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fbf9fd]">
      {/* Nav Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-[#e5e2eb] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold tracking-tight text-[#1c1c2b]">
          CORE <span className="text-[#6b4cc6]">BALANCE</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold text-[#6b7280]">
            <Link to="/book" className="hover:text-[#1c1c2b]">Book a Class</Link>
            <Link to="/memberships" className="hover:text-[#1c1c2b]">Memberships</Link>
            <Link to="/shop" className="text-[#6b4cc6]">Shop</Link>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 bg-[#6b4cc6] text-white rounded-xl hover:bg-[#5b3894] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#1c1c2b] text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6b4cc6]/20 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-[#6b4cc6]/20 text-[#b894e6] border border-[#6b4cc6]/30 text-xs font-bold px-3 py-1.5 rounded-full">
            <Package className="w-3.5 h-3.5" /> Studio Essentials
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">The Core Balance Shop</h1>
          <p className="text-white/70 text-sm max-w-md mx-auto">Studio-curated essentials for your movement practice — at home and in the studio.</p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${category === cat ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]' : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'}`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#9ca3af]">{filtered.length} products</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="relative h-52 overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    product.badge === 'Bestseller' ? 'bg-[#6b4cc6] text-white' :
                    product.badge === 'New' ? 'bg-emerald-500 text-white' :
                    product.badge === 'Low Stock' ? 'bg-rose-500 text-white' :
                    'bg-amber-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-bold text-sm text-[#1c1c2b] mt-0.5">{product.name}</h3>
                  <p className="text-xs text-[#6b7280] mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-[#6b7280]">{product.rating} ({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-xl font-bold text-[#1c1c2b]">KES {product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e2eb]">
              <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">Your Cart</h3>
              <button onClick={() => setCartOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            {checkoutDone ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">✓</div>
                <h4 className="font-serif text-xl font-bold text-[#1c1c2b]">Order Confirmed!</h4>
                <p className="text-sm text-[#6b7280]">M-Pesa prompt sent. Pick up at studio reception or delivered within Nairobi.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-6 text-center text-[#6b7280]">
                <ShoppingCart className="w-10 h-10 text-neutral-300" />
                <p className="text-sm font-medium">Your cart is empty.</p>
                <button onClick={() => setCartOpen(false)} className="text-xs text-[#6b4cc6] font-semibold hover:underline">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-[#fbf9fd] rounded-2xl border border-[#e5e2eb]">
                      <div className="w-10 h-10 bg-[#f4f0fb] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-[#6b4cc6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-[#1c1c2b] truncate">{item.name}</p>
                        <p className="text-xs text-[#6b4cc6] font-bold">KES {(item.price * item.qty).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-neutral-200 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-[#6b4cc6] text-white flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-1 text-neutral-400 hover:text-rose-600"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-[#e5e2eb] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#1c1c2b]">Total</span>
                    <span className="font-serif text-2xl font-bold text-[#6b4cc6]">KES {cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={checkout}
                    className="w-full py-3.5 bg-[#6b4cc6] text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#5b3894] transition-colors"
                  >
                    <Smartphone className="w-4 h-4" /> Pay via M-Pesa
                  </button>
                  <p className="text-[10px] text-[#9ca3af] text-center">Nairobi delivery or studio pickup available</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
