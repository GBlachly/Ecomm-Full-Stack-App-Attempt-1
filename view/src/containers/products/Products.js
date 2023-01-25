import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import { selectProducts, getAllProducts } from './productsSlice';

export const Products = () => {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    /* const [ products, setProducts ] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4001/products/`)
        .then(response => response.json())
        .then(json => setProducts(json.products) )
        .catch(err => console.log(err))
    }, [setProducts]); */

    return (
        <div className=''>
            <h1>Products Container</h1>
            {products.map(product => {
                return (
                    <div className=''>
                        <h2>{product.name}</h2>
                        <h2>{product.price}</h2>
                    </div>
                )
            })}
        </div>
    );
};