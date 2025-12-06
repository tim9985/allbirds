import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Header } from "@/sections/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/sections/Footer";
import { FloatingButton } from "@/components/FloatingButton";
import { HomePage } from "@/pages/HomePage";
import { MensCollection } from "@/pages/MensCollection";
import { ProductDetail } from "@/pages/ProductDetail";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { MyPageLayout } from "@/pages/mypage/MyPageLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { ProductRegistration } from "@/pages/admin/ProductRegistration";
import { SalesReport } from "@/pages/admin/SalesReport";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
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
  padding-top: 104px;
  
  @media (max-width: 767px) {
    padding-top: 96px;
  }
`;

const HiddenList = styled.ul`
  display: none;
  list-style: none;
  padding-left: 0;
`;

export const App = () => {
  return (
    <AuthProvider>
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
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/mypage/*" element={<MyPageLayout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/products/new" element={<ProductRegistration />} />
                <Route path="/admin/sales" element={<SalesReport />} />
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
    </AuthProvider>
  );
};
