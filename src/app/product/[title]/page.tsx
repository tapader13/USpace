'use client';

import ProductDetails from '@/components/ProductDetails';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDetailsPage = () => {
  const title = useParams().title;
  const [data, setData] = useState();
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/item?title=${title}`
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [title]);
  return (
    <div>
      <div>
        <ProductDetails data={data} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
