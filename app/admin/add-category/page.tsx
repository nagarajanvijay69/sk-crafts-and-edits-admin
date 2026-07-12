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

     return (
          <>
               {log && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
                         
                         {/* Header */}
                         <div className="space-y-1">
                              <h1 className="text-3xl font-extrabold font-playfair text-slate-800">Categories & Messages</h1>
                              <p className="text-xs text-slate-500">Configure catalog categories and manage client site banner announcements</p>
                         </div>

                         {/* Side-by-side or stacked modules */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              
                              {/* Left Column: Form (span 1) */}
                              <div className="md:col-span-1 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5 h-fit">
                                   <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Add Category</h2>
                                   
                                   {/* Category Name */}
                                   <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-500">Category Name</label>
                                        <input 
                                             type="text" 
                                             value={name} 
                                             onChange={(e) => setName(e.target.value)} 
                                             placeholder="E.g., Birthday Frames" 
                                             className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-xs transition-all font-semibold" 
                                        />
                                   </div>

                                   {/* Image Selector */}
                                   <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-500">Category Cover Image</label>
                                        <label htmlFor="category-img" className="relative cursor-pointer group block mt-1">
                                             <div className={`aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                                                  img 
                                                  ? "border-brand-pink/30 bg-slate-50" 
                                                  : "border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-brand-pink/40"
                                             }`}>
                                                  {img ? (
                                                       <img className="w-full h-full object-cover rounded-xl" src={`${src}`} alt="preview" />
                                                  ) : (
                                                       <div className="flex flex-col items-center gap-1 text-slate-400">
                                                            <span className="text-lg font-bold">+</span>
                                                            <span className="text-[10px]">Upload Category Image</span>
                                                       </div>
                                                  )}
                                             </div>
                                             <input 
                                                  type="file" 
                                                  onChange={(e) => {
                                                       let file = e.target.files?.[0];
                                                       if (!file) return;
                                                       setImg(file);
                                                       let url = URL.createObjectURL(file);
                                                       setSrc(url);
                                                  }} 
                                                  accept="image/*" 
                                                  id="category-img" 
                                                  className="hidden" 
                                             />
                                        </label>
                                   </div>

                                   {/* Action Submit */}
                                   <button 
                                        className="w-full h-11 rounded-xl text-white font-bold brand-gradient-bg hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer text-xs" 
                                        onClick={handleSubmit}
                                   >
                                        {load ? <Load /> : "Add Category"}
                                   </button>
                              </div>

                              {/* Right Column: List & Message Configuration (span 2) */}
                              <div className="md:col-span-2 space-y-8">
                                   
                                   {/* Existing Categories Card */}
                                   <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Configured Categories ({categorys.length})</h2>
                                        
                                        {categorys[0] ? (
                                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                  {categorys.map((item, index) => (
                                                       <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-brand-pink/20 transition-all">
                                                            <img 
                                                                 src={`${item.image}`} 
                                                                 className="h-12 w-12 object-cover rounded-xl shadow-sm" 
                                                                 alt={String(item.name)} 
                                                            />
                                                            <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
                                                       </div>
                                                  ))}
                                             </div>
                                        ) : (
                                             <p className="text-slate-400 text-xs italic">No Categories Found</p>
                                        )}
                                   </div>

                                   {/* Banner Announcement Editor */}
                                   <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5">
                                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Banner Announcement Message</h2>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                             This message displays as a blinking notification banner at the very top of the customer website. Use it for urgent notices or seasonal offers.
                                        </p>

                                        <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4">
                                             <div className="truncate flex-1">
                                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Message</span>
                                                  <span className="text-sm font-semibold text-slate-700 truncate block mt-0.5">
                                                       {messages ? String(messages) : "Announcement disabled"}
                                                  </span>
                                             </div>
                                             {messages && (
                                                  <button 
                                                       className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center flex-shrink-0" 
                                                       onClick={deteleMessage}
                                                  >
                                                       {deload ? <Load /> : "Disable"}
                                                  </button>
                                             )}
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                             <input 
                                                  type="text" 
                                                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink text-slate-800 text-xs transition-all font-semibold"
                                                  placeholder="Configure a new alert text here..." 
                                                  value={message} 
                                                  onChange={(e) => setMessage(e.target.value)} 
                                             />
                                             <button 
                                                  className="brand-gradient-bg hover:opacity-90 text-white px-5 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center whitespace-nowrap" 
                                                  onClick={submitMessage}
                                             >
                                                  {upload ? <Load /> : "Update Banner"}
                                             </button>
                                        </div>
                                   </div>

                              </div>

                         </div>
                    </div>
               )}
          </>
     );
}

export default AddCategory;