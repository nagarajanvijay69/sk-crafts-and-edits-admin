'use client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/Redux-store'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { initCategory, initMessage } from '@/app/store/Slice';
import Load from '@/app/loading/Load';


const AddCategory = () => {

     let categorys = useSelector((state: RootState) => state.products.categorys);
     let messages = useSelector((state: RootState) => state.products.message);
     let log = useSelector((state: RootState) => state.products.login);
     const dispatch = useDispatch();
     const router = useRouter();
     const [name, setName] = useState("");
     const [load, setLoad] = useState(false);
     const [img, setImg] = useState<File>();
     const [src, setSrc] = useState('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png');
     const [message, setMessage] = useState('');
     const [upload, setUpload] = useState(false);
     const [deload, setDeload] = useState(false);


     const submitMessage = async () => {
          if (!message.trim()) return alert("Message required");
          setUpload(true);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/set-message`, {
               messageInput: message
          })

          if (res.data.success) {
               dispatch(initMessage(message));
          } else {
               alert('Unable to add message');
          }
          setMessage("");
          setUpload(false);
     }
     const deteleMessage = async () => {
          if (!window.confirm("Are you sure to delete ? ")) return;
          setDeload(true);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/set-message`, {
               messageInput: ""
          })
          if (res.data.success) {
               dispatch(initMessage(message));
          } else {
               alert('Unable to add message');
          }
          setDeload(false);
     }

     useEffect(() => {
          if (!log) router.push('/');
     }, []);

     const handleSubmit = async () => {
          if (!name.trim()) {
               setLoad(false)
               return alert("Enter Category Name");
          }
          if (!img) {
               setLoad(false);
               return alert("Input Img");
          }
          setLoad(true);
          const form = new FormData();
          form.append('name', name);
          if (!img) return;
          form.append('image', img);

          const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/add-category`, form, {
               headers: {
                    "Content-Type": "multipart/form-data"
               }
          });
          if (res.data.success) {
               dispatch(initCategory(res.data.categories))
          } else {
               alert(`${res.data.message}`);
          }
          setName("");
          setSrc("https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png");
          setLoad(false);
     }

     return <>
          {
               log &&
               <div className="w-[90dvw] mx-auto">
                    <div className="mx-auto w-[100%] md:w-[90%] lg:w-[80%]">
                         <div className="">
                              <p className='my-5 text-2xl font-semibold'>Add Category Here</p>
                              <div className="name my-5 flex gap-3 flex-col">
                                   <p>Category</p>
                                   <input type="text" className='border-1 border-gray-500 outline-none h-10 lg:w-lg px-4' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Category Name' />
                              </div>
                              <div className="img mt-5 flex gap-3 flex-col flex-wrap lg:w-lg">
                                   <p>Image</p>
                                   <label htmlFor='category-img' className="add my-5 bg-dark h-30 w-40">
                                        <img src={`${src}`} className='h-30' />
                                        <input type="file" onChange={(e) => {
                                             let file = e.target.files?.[0];
                                             if (!file) return;
                                             setImg(file);
                                             let url = URL.createObjectURL(file);
                                             setSrc(url);
                                        }} accept="image/*" id='category-img' className='h-0 w-0 bg-dark object-cover' />
                                   </label>
                              </div>
                              <button className="mt-5 bg-orange-950 text-white font-medium rounded cursor-pointer flex items-center justify-center h-10 w-25" onClick={handleSubmit}>
                                   {
                                        load ?
                                             < Load />
                                             : "ADD"
                                   }
                              </button>                    </div>
                         <h1 className='text-2xl font-semibold mt-3'>Categories</h1>
                         <ul className='flex flex-col gap-5 my-6'>
                              {
                                   categorys.map((item, index) => (
                                        <li key={index} className='pl-5 flex gap-7 border-2 border-gray-500 items-center lg:w-lg'>
                                             <img src={`${item.image}`} className='h-25 w-25 m-2 object-cover rounded' />{item.name}</li>
                                   ))
                              }
                         </ul>
                         <div className="message mt-5 my-10">
                              <p className='text-2xl font-semibold mt-3 mb-2'>Message</p>
                              <div className="message border-2 border-gray-500 lg:w-lg px-2 py-5">
                                   <div className="flex items-center ml-2">
                                        <p className='w-60'>Message : {`${messages ? messages.substring(0, 20) : "Message Not Found"}`}</p>
                                        <button className='ml-5 bg-red-700 text-white h-8 w-18 rounded cursor-pointer flex items-center justify-center' onClick={deteleMessage}>
                                             {
                                                  deload ?
                                                       <Load />
                                                       :
                                                       "Delete"
                                             }
                                        </button>
                                   </div>
                                   <div className="flex items-center ml-2">
                                        <input type="text" className='border-2 border-gray-400 h-10 w-60 mt-2 outline-none px-3 rounded' value={message} onChange={(e) => setMessage(e.target.value)} />
                                        <button className='ml-5 bg-green-700 text-white h-8 w-18 rounded cursor-pointer flex items-center justify-center' onClick={submitMessage}>
                                             {
                                                  upload ?
                                                       <Load />
                                                       :
                                                       "Update"
                                             }
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          }
     </>
}

export default AddCategory;