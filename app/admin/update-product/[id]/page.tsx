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
            {
                log && <div className="flex flex-col justify-between w-full mx-auto overflow-x-hidden">
                    <form className="md:p-10 p-4 max-w-2xl" onSubmit={handleSubmit}>
                        <div>
                            <p className="text-base font-medium">Product Image</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                {product?.image.map((item, index) => (
                                    <label key={index} htmlFor={`image${index}`}>
                                        <img className="max-w-24 cursor-pointer" src={`${item}`} alt="uploadArea" width={100} height={100} />
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                            <input id="product-name" type="text" value={`${name}`} onChange={(e) => setName(e.target.value)} placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                            <textarea id="product-description" rows={4} value={`${discription}`} onChange={(e) => setDiscription(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                        </div>
                        <div className="w-full flex flex-col gap-1 my-3">
                            <label className="text-base font-medium" htmlFor="category">Category</label>
                            <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" value={`${category}`} onChange={(e) => setCategory(e.target.value)} >
                                <option value={`${product?.category}`}>{product?.category}</option>
                                {categorys.map((item, index) => (
                                    item.name != product?.category ?
                                        <option key={index} value={`${item.name}`}>{item.name}</option>
                                        : null
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-name">Product Link</label>
                            <input id="product-name" type="text" placeholder="Type here" value={`${link}`} onChange={(e) => setLink(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                        <div className="flex items-center gap-5 flex-wrap my3">
                            <div className="flex-1 flex flex-col gap-1 w-32">
                                <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                                <input id="product-price" value={`${price}`} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                            </div>
                            <div className="flex-1 flex flex-col gap-1 w-32">
                                <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                                <input id="offer-price" type="number" value={`${offerPrice}`} onChange={(e) => setOfferprice(Number(e.target.value))} placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                            </div>
                        </div>
                        <button className="mt-5 bg-gray-800 text-white font-medium rounded cursor-pointer flex items-center justify-center h-10 w-25" type="submit">
                            {
                                load ?
                                    < Load />
                                    : "UPDATE"
                            }
                        </button>
                    </form >
                </div >
            }
        </>
    );
};


export default UpdateProduct;