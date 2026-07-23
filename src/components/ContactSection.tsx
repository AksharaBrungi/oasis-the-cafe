import React, { useState } from "react";
import { MapPin, Phone, MessageSquare, Instagram, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [sentToast, setSentToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setSentToast(true);
    setTimeout(() => setSentToast(false), 4000);

    const msg = `Hi Oasis The Cafe 👋

I have an inquiry from your website:

• Name: ${formName}
• Phone: ${formPhone}
• Message: ${formMessage}`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");

    setFormName("");
    setFormPhone("");
    setFormMessage("");
  };

  const contactCards = [
    {
      title: "Phone Call",
      detail: "+91 98765 43210",
      action: "Click to Call",
      href: "tel:+919876543210",
      icon: Phone,
      color: "text-blue-400 border-blue-500/30 bg-blue-950/40",
    },
    {
      title: "WhatsApp Chat",
      detail: "+91 98765 43210",
      action: "Open WhatsApp",
      href: "https://wa.me/919876543210?text=Hi%20Oasis%20The%20Cafe%20👋",
      icon: MessageSquare,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
    },
    {
      title: "Instagram",
      detail: "@oasisthecafe.hyd",
      action: "Follow & DM",
      href: "https://www.instagram.com/oasisthecafe.hyd/?utm_source=ig_web_button_share_sheet",
      icon: Instagram,
      color: "text-pink-400 border-pink-500/30 bg-pink-950/40",
    },
    {
      title: "Location",
      detail: "BN Reddy Nagar, Hyderabad",
      action: "Open Google Maps",
      href: "https://maps.google.com/?q=Oasis+The+Cafe+BN+Reddy+Nagar+Hyderabad",
      icon: MapPin,
      color: "text-[#E30613] border-[#E30613]/30 bg-red-950/40",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Connect & Visit
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Get In Touch
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            We are located in BN Reddy Nagar, Hyderabad. We look forward to welcoming you!
          </p>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card) => {
            const IconComp = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-3xl border transition-all duration-300 group hover:-translate-y-1.5 shadow-xl ${card.color}`}
              >
                <div className="p-3.5 rounded-2xl bg-black/60 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">{card.title}</h4>
                <p className="text-xs text-gray-300 font-poppins mb-3">{card.detail}</p>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:underline flex items-center gap-1">
                  <span>{card.action}</span>
                  <span>→</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Main Grid: Google Maps + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Interactive Map & Hours */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 relative group">
              {/* Google Map iframe pointing to BN Reddy Nagar Hyderabad */}
              <iframe
                title="Oasis The Cafe Location BN Reddy Nagar Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.8354966601423!2d78.5583!3d17.3241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98d1a1111111%3A0x1111111111111111!2sBN%20Reddy%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full filter contrast-125 brightness-90 border-0"
                loading="lazy"
              />

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E30613]" />
                <span className="text-xs font-bold text-white font-poppins">
                  BN Reddy Nagar, Hyderabad
                </span>
              </div>
            </div>

            {/* Hours Box */}
            <div className="p-6 rounded-3xl bg-[#161616] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/40">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">Opening Hours</h4>
                  <p className="text-xs text-gray-400 font-poppins">Open 7 Days A Week</p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-sm font-bold text-emerald-400 font-poppins">
                  Opens Daily at 12:00 Noon
                </span>
                <span className="text-[11px] text-gray-500 font-poppins">Rooftop Service</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#161616] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">Send Us A Message</h3>
              <p className="text-xs text-gray-400 font-poppins mb-6">
                Have questions regarding table bookings, party packages, or bulk orders? Reach out directly!
              </p>

              {sentToast && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-poppins flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Message sent! Opening WhatsApp to connect with Oasis manager...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-poppins">
                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Akshara Reddy"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Message / Inquiry</label>
                  <textarea
                    rows={3}
                    placeholder="Inquire about menu items, seating, or special party arrangements..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3.5 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E30613] to-[#B0040E] hover:from-[#FF1A27] hover:to-[#E30613] text-white font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
