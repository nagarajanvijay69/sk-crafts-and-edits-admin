'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Redux-store'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { initProduct } from '../../store/Slice';


const Home = () => {

    let products = useSelector((state: RootState) => state.products.products);
    let category = useSelector((state: RootState) => state.products.categorys);
    let message: String = useSelector((state: RootState) => state.products.message);
    const router = useRouter();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    let log = useSelector((state: RootState) => state.products.login);

    useEffect(() => {
        if (!log) router.push('/');
    }, []);

    const handleDelete = async (id: String) => {
        if (window.confirm("Are you sure to delete this product ?")) {
            setLoad(true);
            let res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URI}/delete-product`, {
                data: { id }
            });
            dispatch(initProduct(res.data.products));
            if (!res.data.success) alert(`${res.data.message}`);
            setLoad(false);
        }
    }

    return (
        <>
            {
                log &&
                <div className="flex-1 py-10 flex flex-col justify-between">
                    <div className="w-full md:p-10 p-4">
                        <h2 className="pb-4 text-lg font-medium">All Products</h2>
                        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                            {
                                products[0] ?
                                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                                        <thead className="text-gray-900 text-sm text-left">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                                <th className="px-4 py-3 font-semibold truncate">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-500">
                                            {products.map((product, index) => (
                                                <tr key={index} className="border-t border-gray-500/20">
                                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                                        <div className="rounded overflow-hidden">
                                                            <img src={`${product.image[0]}`} alt="Product" className="h-25 w-25 m-2" />
                                                        </div>
                                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                                    </td>
                                                    <td className="px-4 py-3">{product.category}</td>
                                                    <td className="px-4 py-3 max-sm:hidden">${`${product.offerPrice}`}</td>
                                                    <td className="px-4 py-3 gap-3 items-center justify-center">
                                                        <button className='cursor-pointer mr-3 h-10 w-10'><img src="../edit.png" onClick={() => router.push(`/admin/update-product/${product._id}`)} className='size-7' /></button>
                                                        <button className='cursor-pointer h-10 w-10' onClick={() => handleDelete(product._id)}>
                                                            {
                                                                load ? <img src="../delete.png" className='size-7 animate-bounce' />
                                                                : <img src="../delete.png" className='size-7' />
                                                            }
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <p className='mr-auto py-2 pl-3'>No Products Found</p>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Home;