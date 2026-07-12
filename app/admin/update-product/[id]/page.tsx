'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/Redux-store'
import { useEffect, useState } from "react";
import { initProduct } from '../../../store/Slice';
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Load from "@/app/loading/Load";

const UpdateProduct = () => {
    let products = useSelector((state: RootState) => state.products.products);
    let categorys = useSelector((state: RootState) => state.products.categorys);

    const router = useRouter();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    let log = useSelector((state: RootState) => state.products.login);

    useEffect(() => {
        if (!log) router.push('/');
    }, [])



    const params = useParams();

    const product = products.find((item) => item._id == params.id);

    const [name, setName] = useState(product?.name || "");
    const [discription, setDiscription] = useState(product?.discription || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [offerPrice, setOfferprice] = useState(product?.offerPrice || 0);
    const [link, setLink] = useState(product?.link || "");
    const [category, setCategory] = useState(product?.category)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(name, discription, price, offerPrice, link, category);
        setLoad(true);
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/update-product`, {
            data: {
                id: params.id,
                name, discription, price: Number(price),
                offerPrice: Number(offerPrice),
                link, category
            }
        });
        if (res.data.success) {
            dispatch(initProduct(res.data.products));
            router.push('/admin/home');
        }
        else alert(`${res.data.message}`);
        setLoad(false);
    }




    return (
        <>
            {log && (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-screen">
                    
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold font-playfair text-slate-800">Update Product</h1>
                        <p className="text-xs text-slate-500">Edit settings and update listing properties for this product</p>
                    </div>

                    <form className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Current Images Preview */}
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-700">Product Images</p>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                {product?.image.map((item, index) => (
                                    <div key={index} className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                                        <img className="w-full h-full object-cover" src={`${item}`} alt="preview" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="product-name">Product Name</label>
                             <input 
                                id="product-name" 
                                type="text" 
                                value={`${name}`} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="E.g., Custom Photo Frame" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                required 
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="product-description">Product Description</label>
                            <textarea 
                                id="product-description" 
                                rows={4} 
                                value={`${discription}`} 
                                onChange={(e) => setDiscription(e.target.value)} 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all resize-none font-medium leading-relaxed" 
                                placeholder="Describe the materials..."
                            />
                        </div>

                        {/* Category Select */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="category">Category</label>
                            <select 
                                id="category" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                value={`${category}`} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value={`${product?.category}`}>{product?.category}</option>
                                {categorys.map((item, index) => (
                                    item.name != product?.category ? (
                                        <option key={index} value={`${item.name}`}>{item.name}</option>
                                    ) : null
                                ))}
                            </select>
                        </div>

                        {/* Product Buy Link */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="product-link">Purchase Link / WhatsApp URL</label>
                            <input 
                                id="product-link" 
                                type="text" 
                                placeholder="Type link details here" 
                                value={`${link}`} 
                                onChange={(e) => setLink(e.target.value)} 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                required 
                            />
                        </div>

                        {/* Pricing Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-700" htmlFor="product-price">Original Price (₹)</label>
                                <input 
                                    id="product-price" 
                                    value={`${price}`} 
                                    onChange={(e) => setPrice(Number(e.target.value))} 
                                    type="number" 
                                    placeholder="0" 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-700" htmlFor="offer-price">Offer Price (₹)</label>
                                <input 
                                    id="offer-price" 
                                    type="number" 
                                    value={`${offerPrice}`} 
                                    onChange={(e) => setOfferprice(Number(e.target.value))} 
                                    placeholder="0" 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="pt-4 flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => router.push('/admin/home')}
                                className="w-1/2 sm:w-28 h-12 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                className="w-1/2 sm:w-40 h-12 rounded-xl text-white font-bold brand-gradient-bg hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer text-sm" 
                                type="submit"
                            >
                                {load ? <Load /> : "Update Product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};


export default UpdateProduct;