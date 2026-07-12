'use client'
import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from '../store/Redux-store'

const Navbar = () => {
     const [nav, setNav] = useState<boolean>(false);
     const router = useRouter();
     const pathname = usePathname();
     const log = useSelector((state: RootState) => state.products.login);

     useEffect(() => {
          if (!log) router.push('/');
     }, [log]);

     const toggle = (): void => {
          setNav(!nav);
     }

     const navLinks = [
          { name: "Home", href: "/admin/home" },
          { name: "Add Product", href: "/admin/add-product" },
          { name: "Add Category", href: "/admin/add-category" }
     ];

     return (
          <>
               {log && (
                    <>
                         <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-4">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                   <div className="flex items-center justify-between h-14">
                                        
                                        {/* Logo */}
                                        <div className="flex-shrink-0 z-50">
                                             <Link href="/admin/home" className="flex items-center gap-1 group">
                                                  <span className="brand-gradient-bg text-white font-extrabold text-lg px-2.5 py-1.5 rounded-xl shadow-md">
                                                       SK
                                                  </span>
                                                  <span className="font-playfair text-lg font-bold tracking-tight text-slate-800">
                                                       Edits & Crafts <span className="text-xs font-bold text-brand-pink ml-1">Admin</span>
                                                  </span>
                                             </Link>
                                        </div>

                                        {/* Desktop Links */}
                                        <nav className="hidden lg:flex items-center gap-8">
                                             <ul className="flex items-center gap-8 font-semibold text-slate-600 text-sm">
                                                  {navLinks.map((link) => {
                                                       const isActive = pathname === link.href;
                                                       return (
                                                            <li key={link.href}>
                                                                 <Link 
                                                                      href={link.href}
                                                                      className={`relative py-2 transition-colors hover:text-brand-pink ${
                                                                           isActive ? "text-brand-pink font-bold" : ""
                                                                      }`}
                                                                 >
                                                                      {link.name}
                                                                      <span className={`absolute bottom-0 left-0 w-full h-0.5 brand-gradient-bg rounded-full transition-transform duration-300 origin-left ${
                                                                           isActive ? "scale-x-100" : "scale-x-0"
                                                                      }`} />
                                                                 </Link>
                                                            </li>
                                                       );
                                                  })}
                                                  <li>
                                                       <a 
                                                            href="https://sk-crafts-and-edits-frontend.vercel.app" 
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-brand-pink border border-brand-pink/20 hover:bg-brand-pink/5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                                                       >
                                                            Client Site &nearr;
                                                       </a>
                                                  </li>
                                             </ul>
                                        </nav>

                                        {/* Hamburger Button */}
                                        <div className="flex lg:hidden z-50">
                                             <button 
                                                  onClick={toggle}
                                                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
                                                  aria-label="Toggle Menu"
                                             >
                                                  <img 
                                                       src={nav ? '../close.svg' : '../menu.svg'} 
                                                       className="w-8 h-8 transition-transform duration-200" 
                                                       alt="menu icon"
                                                  />
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </header>

                         {/* Mobile Navigation Drawer */}
                         <div className={`fixed inset-0 z-[9999] lg:hidden transition-opacity duration-300 ${
                              nav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                         }`}>
                              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={toggle} />

                              <aside className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
                                   nav ? "translate-x-0" : "translate-x-full"
                              }`}>
                                   <div className="mt-16">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Admin Settings</p>
                                        <nav className="flex flex-col gap-5">
                                             {navLinks.map((link) => {
                                                  const isActive = pathname === link.href;
                                                  return (
                                                       <Link 
                                                            key={link.href} 
                                                            href={link.href} 
                                                            onClick={toggle}
                                                            className={`text-lg font-bold py-2 border-b border-slate-50 transition-colors flex items-center justify-between ${
                                                                 isActive ? "text-brand-pink font-bold" : "text-slate-800 hover:text-brand-pink"
                                                            }`}
                                                       >
                                                            {link.name}
                                                            <span className="text-xs text-slate-300">&rarr;</span>
                                                       </Link>
                                                  );
                                             })}
                                             <a 
                                                  href="https://sk-crafts-and-edits-frontend.vercel.app" 
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  onClick={toggle}
                                                  className="text-lg font-bold py-2 text-brand-pink border-b border-slate-50 flex items-center justify-between"
                                             >
                                                  Client Site
                                                  <span className="text-xs text-slate-300">&nearr;</span>
                                             </a>
                                        </nav>
                                   </div>

                                   <div className="border-t border-slate-100 pt-6">
                                        <p className="text-sm font-bold text-slate-800">SK Edits & Crafts</p>
                                        <p className="text-xs text-slate-500 mt-1">Portal Administrator Mode</p>
                                   </div>
                              </aside>
                         </div>
                    </>
               )}
          </>
     );
}

export default Navbar;
