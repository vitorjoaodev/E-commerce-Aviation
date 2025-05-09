import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import ExitPopup from "./ExitPopup";
import SearchOverlay from "./SearchOverlay";
import { useDispatch } from "react-redux";
import { showExitPopup } from "@/store/uiSlice";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const [location] = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Track mouse movement for exit intent popup
    const handleMouseLeave = (e: MouseEvent) => {
      // If the user moves mouse to the top of the page (potentially to leave)
      if (e.clientY < 5) {
        // Check if we've shown the popup before in this session
        const hasShownPopup = sessionStorage.getItem("exitPopupShown");
        if (!hasShownPopup) {
          dispatch(showExitPopup(true));
          sessionStorage.setItem("exitPopupShown", "true");
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartDrawer />
      <ExitPopup />
      <SearchOverlay />
    </div>
  );
}
