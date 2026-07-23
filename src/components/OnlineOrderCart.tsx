import React, { useState } from "react";
import { CartItem } from "../types";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageSquare, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnlineOrderCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OnlineOrderCart: React.FC<OnlineOrderCartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [diningType, setDiningType] = useState<"Dine In" | "Takeaway" | "Delivery">("Dine In");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const handlePlaceOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (diningType === "Delivery" && !deliveryAddress.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

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

Grand Total: ₹${grandTotal}

Special Instructions:
${specialInstructions.trim() || "None"}

Thank you.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#121212] border-l border-[#E30613]/30 shadow-2xl flex flex-col justify-between text-white"
            >
              {/* Header */}
              <div className="p-6 bg-[#161616] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold">Your Cart</h3>
                    <p className="text-xs text-gray-400 font-poppins">
                      {cartItems.length} items selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Items List */}
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 bg-[#161616] rounded-2xl border border-white/5">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                    <p className="font-cinzel text-base text-gray-300">Your cart is empty</p>
                    <p className="text-xs text-gray-500 font-poppins mt-1">
                      Browse our menu and add your favorite rooftop dishes!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Cart Items
                      </span>
                      <button
                        onClick={onClearCart}
                        className="text-[11px] text-red-400 hover:underline cursor-pointer"
                      >
                        Clear Cart
                      </button>
                    </div>

                    {cartItems.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="p-3.5 rounded-2xl bg-[#161616] border border-white/10 flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-cinzel text-xs font-bold text-white truncate">
                            {item.menuItem.name}
                          </h4>
                          <span className="text-xs text-[#E30613] font-bold">
                            ₹{item.menuItem.price * item.quantity}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-[#0B0B0B] border border-white/10 rounded-xl p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                            className="p-1 rounded bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 text-xs font-bold text-white font-poppins">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                            className="p-1 rounded bg-[#E30613] text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.menuItem.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Customer Details Form */}
                {cartItems.length > 0 && (
                  <form id="drawerCheckoutForm" onSubmit={handlePlaceOrderWhatsApp} className="space-y-3 pt-2">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#E30613] border-t border-white/10 pt-4 flex items-center gap-1.5">
                      <Utensils className="w-4 h-4" />
                      <span>Checkout Details</span>
                    </h4>

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Customer Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none font-poppins"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none font-poppins"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Dining Type *</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["Dine In", "Takeaway", "Delivery"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setDiningType(option)}
                            className={`py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                              diningType === option
                                ? "bg-[#E30613] text-white shadow-md"
                                : "bg-[#161616] text-gray-400 border border-white/10"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {diningType === "Dine In" && (
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Table Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 7"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none font-poppins"
                        />
                      </div>
                    )}

                    {diningType === "Delivery" && (
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Delivery Address *</label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Full Delivery Address *"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none font-poppins resize-none"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Special Instructions (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Less spicy, extra sauce"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none font-poppins"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Footer Summary & Place Order Button */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-[#161616] border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center font-cinzel text-base font-bold text-white">
                    <span>Grand Total</span>
                    <span className="text-[#E30613]">₹{grandTotal}</span>
                  </div>

                  <button
                    type="submit"
                    form="drawerCheckoutForm"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Place Order via WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
