import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import {AuthProvider} from "@/features/auth/context/AuthContext.jsx";
import {CartProvider} from "@/features/user/cart/context/CartContext.jsx";
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <CartProvider>
              <App />
          </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
