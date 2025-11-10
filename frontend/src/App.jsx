
import AppRoutes from '../routes'
import './App.css'
import {ToastContainer, toast} from "react-toastify";

function App() {
  return (
      <div>
        <AppRoutes/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </div>
  )
}

export default App
