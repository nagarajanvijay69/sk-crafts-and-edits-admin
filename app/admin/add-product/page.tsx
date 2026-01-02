'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/Redux-store'
import { useEffect, useState } from "react";
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
    const [category, setCategory] = useState("");
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
        form.append("category", category);
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
            {
                log &&
                <div className="flex flex-col justify-between mx-auto w-[100%] md:w-[90%] lg:w-[80%] overflow-x-hidden">
                    <form className="md:p-10 p-4 max-w-2xl" onSubmit={handleSubmit}>
                        <div>
                            <p className="text-base font-medium">Product Image</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                {Array(4).fill('').map((_, index) => (
                                    <label key={index} htmlFor={`image${index}`}>
                                        <input onChange={(e) => handleImage(e, index)} accept="image/*" type="file" id={`image${index}`} hidden />
                                        <img className="max-w-24 cursor-pointer" src={`${images[index] ? images[index] : 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png'}`} alt="uploadArea" width={100} height={100} />
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                            <input id="product-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                            <textarea id="product-description" rows={4} value={discription} onChange={(e) => setDiscription(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                        </div>
                        <div className="w-full flex flex-col gap-1 my-3">
                            <label className="text-base font-medium" htmlFor="category">Category</label>
                            <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" value={category} onChange={(e) => setCategory(e.target.value)} >
                                {categorys.map((item, index) => (
                                    <option key={index} value={`${item.name}`}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <label className="text-base font-medium" htmlFor="product-name">Product Link</label>
                            <input id="product-name" type="text" placeholder="Type here" value={link} onChange={(e) => setLink(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
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
                        <button className="mt-5 bg-orange-950 text-white font-medium rounded cursor-pointer flex items-center justify-center h-10 w-25" type="submit">
                            {
                              load ? 
                              < Load/>
                              : "ADD"
                            }
                        </button>
                    </form>
                </div>
            }

        </>
    );
};


export default AddProduct;