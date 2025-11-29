import styled from "styled-components";
import { CartDrawerContent } from "@/components/CartDrawer/components/CartDrawerContent";
import { useCart } from "@/context/CartContext";

const DrawerSection = styled.section`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Overlay = styled.div`
  position: fixed;
  background-color: black;
  box-sizing: border-box;
  caret-color: transparent;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  opacity: 0.5;
  z-index: 1050;
  inset: 0;
`;

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <DrawerSection>
      <Overlay $isOpen={isCartOpen} onClick={closeCart} />
      <CartDrawerContent />
    </DrawerSection>
  );
};
