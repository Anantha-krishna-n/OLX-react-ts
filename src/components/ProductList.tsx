import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/Setup';

interface Product {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number; 
  createdAt: string;
}
const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(firestore, 'products'));
          const productsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Product[];
          console.log(productsData);
          
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    if (loading) {
      return <p>Loading products...</p>;
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.imageURL} alt={product.name} className="w-full h-60 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-semibold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">{product.createdAt}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductList;

