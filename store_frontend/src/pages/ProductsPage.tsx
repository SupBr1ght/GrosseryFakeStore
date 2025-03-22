import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/product";

export default function ProductPages(){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/products");
          setProducts(response.data);
          console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchItems();
    }, []);
    return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Items List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg"
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
    );
    
} 

