import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Header } from "@/sections/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/sections/Footer";
import { FloatingButton } from "@/components/FloatingButton";
import { HomePage } from "@/pages/HomePage";
import { MensCollection } from "@/pages/MensCollection";
import { ProductDetail } from "@/pages/ProductDetail";
import { CartProvider } from "@/context/CartContext";
import styled from "styled-components";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;
  background-color: white;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1rem;
  color: #333;
  line-height: 1.75;
  overflow-y: auto;
`;

const MainContent = styled.main`
  position: relative;
`;

const HiddenList = styled.ul`
  display: none;
  list-style: none;
  padding-left: 0;
`;

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContainer>
          <AnnouncementBanner />
          <Header />
          <CartDrawer />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections/mens-off" element={<MensCollection />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
            </Routes>
          </MainContent>
          <Footer />
          <HiddenList>
            <li>Choosing a selection results in a full page refresh.</li>
            <li>Opens in a new window.</li>
          </HiddenList>
          <FloatingButton />
        </AppContainer>
      </BrowserRouter>
    </CartProvider>
  );
};
