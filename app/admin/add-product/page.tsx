'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/Redux-store'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { initProduct } from '../../store/Slice'
import Load from '../../loading/Load'

const AddProduct = () => {
    let categorys = useSelector((state: RootState) => state.products.categorys);
    let log = useSelector((state: RootState) => state.products.login);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!log) router.push('/');
    }, [])

    const [name, setName] = useState("");
    const [discription, setDiscription] = useState("");
    const [price, setPrice] = useState<Number>(0);
    const [offerPrice, setOfferprice] = useState<Number>(0);
    const [link, setLink] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const categoryRef = useRef("");
    const [category, setCategory] = useState("")
    const [tempImg, setTempImg] = useState<File[]>([]);
    const [load, setLoad] = useState(false);


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        let t = [...tempImg];
        t[index] = file;
        setTempImg(t);

        const files:any = [...images];
        files[index] = URL.createObjectURL(file);
        setImages(files);
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        form.append("discription", discription);
        form.append("price", String(price));
        form.append("offerPrice", String(offerPrice));
        form.append("link", link);
        form.append("category", categoryRef.current);
        tempImg.forEach((item)=>{
            form.append("images", item);
        })
        setLoad(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/post-product`,form, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        });
        if(res.data.success){
            dispatch(initProduct(res.data.products));
            // console.log(res.data.products);
            
            setName('');
            setDiscription('');
            setLink('');
            setOfferprice(0);
            setPrice(0);
            router.push('/admin/home');
        }else{
            alert(`${res.data.message}`);
        }
        setLoad(false)
    }




    return (
        <>
            {log && (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-screen">
                    
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold font-playfair text-slate-800">Add Product</h1>
                        <p className="text-xs text-slate-500">Create and list a new handcrafted photo frame or customized gift</p>
                    </div>

                    <form className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Image Upload Area */}
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-700">Product Images (up to 4)</p>
                            <p className="text-[11px] text-slate-400">Select files to upload (JPG, PNG, WebP format recommended)</p>
                            <div className="grid grid-cols-4 gap-3 pt-2">
                                {Array(4).fill('').map((_, index) => (
                                    <label key={index} htmlFor={`image${index}`} className="relative cursor-pointer group">
                                        <input onChange={(e) => handleImage(e, index)} accept="image/*" type="file" id={`image${index}`} hidden />
                                        
                                        <div className={`aspect-square w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                                            images[index] 
                                            ? "border-brand-pink/30 bg-slate-50" 
                                            : "border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-brand-pink/40"
                                        }`}>
                                            {images[index] ? (
                                                <img className="w-full h-full object-cover rounded-xl" src={`${images[index]}`} alt="preview" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                                    <span className="text-xl font-bold">+</span>
                                                    <span className="text-[10px] hidden sm:block">Upload</span>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="product-name">Product Name</label>
                            <input 
                                id="product-name" 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="E.g., Personalized Anniversary Wooden Frame" 
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
                                value={discription} 
                                onChange={(e) => setDiscription(e.target.value)} 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all resize-none font-medium leading-relaxed" 
                                placeholder="Describe the materials, customization choices, dimensions..."
                            />
                        </div>

                        {/* Category Select */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="category">Category</label>
                            <select 
                                id="category" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-sm transition-all font-medium" 
                                value={categoryRef.current}
                                onChange={(e) => {
                                    categoryRef.current = e.target.value;
                                    setCategory(e.target.value);
                                }}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {categorys.map((item, index) => (
                                    <option key={index} value={`${item.name}`}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Product Buy Link */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700" htmlFor="product-link">Purchase Link / WhatsApp Redirection URL</label>
                            <input 
                                id="product-link" 
                                type="text" 
                                placeholder="Type link details here" 
                                value={link} 
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

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button 
                                className="w-full sm:w-40 h-12 rounded-xl text-white font-bold brand-gradient-bg hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer" 
                                type="submit"
                            >
                                {load ? <Load /> : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};


export default AddProduct;