import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { MenuPage } from "./pages/MenuPage";
import { CelebrationsPage } from "./pages/CelebrationsPage";
import { OffersPage } from "./pages/OffersPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ContactPage } from "./pages/ContactPage";
import { CartPage } from "./pages/CartPage";

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="celebrations" element={<CelebrationsPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CartPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
