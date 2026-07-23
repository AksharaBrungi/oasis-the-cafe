import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Utensils,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Receipt,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export const CartPage: React.FC = () => {
  const {
    cartItems,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleClearCart,
    totalCartAmount,
  } = useApp();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [diningType, setDiningType] = useState<"Dine In" | "Takeaway" | "Delivery">("Dine In");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please fill in required fields (Name & Phone Number).");
      return;
    }

    if (diningType === "Delivery" && !deliveryAddress.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    // Build the formatted WhatsApp message as specified
    let locationDetail = "";
    if (diningType === "Dine In") {
      locationDetail = `Table No: ${tableNumber.trim() || "N/A"}\n\n`;
    } else if (diningType === "Delivery") {
      locationDetail = `Delivery Address: ${deliveryAddress.trim() || "N/A"}\n\n`;
    }

    const itemsText = cartItems
      .map((i) => `• ${i.menuItem.name} ×${i.quantity} – ₹${i.menuItem.price * i.quantity}`)
      .join("\n\n");

    const message = `🍽️ Oasis The Cafe Order

Name: ${customerName.trim()}

Phone: ${customerPhone.trim()}

Dining Type: ${diningType}

${locationDetail}Items

${itemsText}

Grand Total: ₹${totalCartAmount}

Special Instructions:
${specialInstructions.trim() || "None"}

Thank you.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

    // Open WhatsApp automatically
    window.open(whatsappUrl, "_blank");

    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto text-center min-h-[80vh] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#161616] border border-[#E30613]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 w-full"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-[#E30613] tracking-widest uppercase">
              Order Transmitted to WhatsApp
            </span>
            <h1 className="font-cinzel text-3xl font-extrabold text-white">
              Thank You, {customerName}!
            </h1>
            <p className="text-xs text-gray-300 font-poppins max-w-md mx-auto leading-relaxed">
              WhatsApp has opened with your order details pre-filled. Simply press the Send button in WhatsApp to place your order directly with Oasis The Cafe!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 text-left text-xs font-poppins space-y-2.5">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Customer Name:</span>
              <span className="font-bold text-white">{customerName}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Dining Type:</span>
              <span className="font-bold text-[#E30613]">{diningType}</span>
            </div>
            {diningType === "Dine In" && tableNumber && (
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Table No:</span>
                <span className="font-bold text-white">{tableNumber}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Grand Total:</span>
              <span className="font-cinzel font-bold text-lg text-emerald-400">₹{totalCartAmount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                handleClearCart();
                setIsOrderPlaced(false);
              }}
              className="w-full py-3.5 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold text-xs uppercase tracking-wider text-center cursor-pointer transition-colors"
            >
              Start New Order
            </button>
            <Link
              to="/menu"
              onClick={() => setIsOrderPlaced(false)}
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-xl mx-auto text-center min-h-[70vh] flex flex-col justify-center items-center">
        <div className="p-6 rounded-full bg-[#161616] border border-white/10 text-gray-400 mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="font-cinzel text-3xl font-bold text-white mb-2">Your Cart Is Empty</h2>
        <p className="text-xs text-gray-400 font-poppins mb-8">
          Explore our menu and add delicious rooftop items to your cart!
        </p>
        <Link
          to="/menu"
          className="px-8 py-4 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.6)] transition-all"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.25em] font-poppins">
            Review & Order
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Shopping Cart & Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#E30613]" />
                <span>Selected Items ({cartItems.length})</span>
              </h3>
              <button
                onClick={handleClearCart}
                className="text-xs text-red-400 hover:underline flex items-center gap-1 font-poppins cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="p-4 rounded-2xl bg-[#161616] border border-white/10 flex items-center justify-between gap-4"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-cinzel text-sm font-bold text-white truncate">
                      {item.menuItem.name}
                    </h4>
                    <span className="text-xs font-bold font-poppins text-[#E30613]">
                      ₹{item.menuItem.price} each
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0B0B0B] border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => handleUpdateCartQuantity(item.menuItem.id, -1)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold font-poppins">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateCartQuantity(item.menuItem.id, 1)}
                      className="p-1.5 rounded-lg bg-[#E30613] hover:bg-[#FF1A27] text-white cursor-pointer transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-cinzel font-bold text-white shrink-0 text-right">
                    ₹{item.menuItem.price * item.quantity}
                  </span>

                  <button
                    onClick={() => handleRemoveFromCart(item.menuItem.id)}
                    className="p-2 text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#161616] border border-white/10 flex items-center justify-between font-cinzel text-lg font-bold">
              <span>Subtotal</span>
              <span className="text-[#E30613]">₹{totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handlePlaceOrder}
              className="p-6 rounded-3xl bg-[#161616] border border-white/10 shadow-2xl space-y-5"
            >
              <h3 className="font-cinzel text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#E30613]" />
                <span>Customer Checkout</span>
              </h3>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1 font-poppins">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl p-3 outline-none font-poppins"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1 font-poppins">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl p-3 outline-none font-poppins"
                />
              </div>

              {/* Dining Type */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2 font-poppins">
                  Dining Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Dine In", "Takeaway", "Delivery"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDiningType(option)}
                      className={`py-2.5 rounded-xl text-xs font-bold tracking-wider cursor-pointer transition-all ${
                        diningType === option
                          ? "bg-[#E30613] text-white shadow-[0_0_12px_rgba(227,6,19,0.5)]"
                          : "bg-[#0B0B0B] text-gray-400 border border-white/10 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Table Number for Dine In */}
              {diningType === "Dine In" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1 font-poppins">
                    Table Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table No: 7"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl p-3 outline-none font-poppins"
                  />
                </motion.div>
              )}

              {/* Conditional Delivery Address for Delivery */}
              {diningType === "Delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1 font-poppins">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter full delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl p-3 outline-none font-poppins resize-none"
                  />
                </motion.div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1 font-poppins">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Less spicy, extra sauce"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl p-3 outline-none font-poppins resize-none"
                />
              </div>

              {/* Grand Total Summary */}
              <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-white/10 flex items-center justify-between">
                <span className="font-cinzel text-base font-bold text-white">Grand Total</span>
                <span className="font-cinzel text-xl font-bold text-[#E30613]">
                  ₹{totalCartAmount}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(37,211,102,0.4)] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Place Order via WhatsApp</span>
              </button>

              <p className="text-[10px] text-gray-400 text-center font-poppins leading-relaxed">
                Clicking Place Order automatically opens WhatsApp with your complete order breakdown ready to send.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
