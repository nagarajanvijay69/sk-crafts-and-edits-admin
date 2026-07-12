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
            {log && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
                    
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold font-playfair text-slate-800">Dashboard</h1>
                        <p className="text-xs text-slate-500">Manage your frames, catalog collections, and system messages</p>
                    </div>

                    {/* Metric Cards Top Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Stat 1 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <span className="text-3xl p-3 bg-brand-pink/15 rounded-2xl">🖼️</span>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Products</p>
                                <p className="text-2xl font-extrabold text-slate-800">{products.length}</p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <span className="text-3xl p-3 bg-brand-pink/15 rounded-2xl">📁</span>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Categories</p>
                                <p className="text-2xl font-extrabold text-slate-800">{category.length}</p>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 col-span-1 sm:col-span-1">
                            <span className="text-3xl p-3 bg-brand-pink/15 rounded-2xl">📢</span>
                            <div className="truncate flex-1">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Message</p>
                                <p className="text-sm font-semibold text-slate-700 truncate mt-1">
                                    {message ? String(message) : "No message configured"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Products List Section */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">All Products</h2>
                            <button 
                                onClick={() => router.push('/admin/add-product')}
                                className="brand-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                            >
                                + Add New Product
                            </button>
                        </div>

                        {products[0] ? (
                            <div className="overflow-x-auto w-full">
                                <table className="w-full min-w-[600px] border-collapse text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="px-6 py-4">Product Details</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Offer Price</th>
                                            <th className="px-6 py-4">List Price</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                                        {products.map((product, index) => (
                                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    <img 
                                                        src={`${product.image[0]}`} 
                                                        alt="Product preview" 
                                                        className="w-12 h-12 rounded-xl object-cover border border-slate-100" 
                                                    />
                                                    <span className="font-bold text-slate-800 truncate max-w-[200px]">
                                                        {String(product.name)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-brand-pink-dark">
                                                    {String(product.category)}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-900">
                                                    ₹{String(product.offerPrice)}
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 line-through text-xs">
                                                    ₹{String(product.price)}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    {/* Edit Button */}
                                                    <button 
                                                        onClick={() => router.push(`/admin/update-product/${product._id}`)}
                                                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer inline-flex"
                                                        title="Edit Product"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                    
                                                    {/* Delete Button */}
                                                    <button 
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer inline-flex"
                                                        title="Delete Product"
                                                    >
                                                        {load ? (
                                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-16 text-center space-y-3">
                                <span className="text-4xl">📭</span>
                                <p className="text-slate-400 text-sm italic">No Products Found. Create your first product above!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;