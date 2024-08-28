import React from 'react';
import { ProductDTO } from '../api';

interface ProductItemProps {
    product: ProductDTO;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <tr className="product-item">
            <td>{product.name}</td>
            <td>${product.price?.toFixed(2)}</td>
            <td>{product.stockQuantity}</td>
            <td>{product.deliveryDays} days</td>
            <td><button>Add to Cart</button></td>
        </tr>
    );
};

export default ProductItem;