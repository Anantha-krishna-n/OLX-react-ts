
import Navbar from "./Navbar"
import Menubar from "./Menubar"
import ProductList from "./ProductList"
import Footer from "./Footer"
import { useAuth } from "../context/AuthContext";
const Main = () => {
  return (
    <div>
       <Menubar />
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products for Sale</h1>
      <ProductList />
      <Footer />
    </div>
    </div>
  )
}

export default Main