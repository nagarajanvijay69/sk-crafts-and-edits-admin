'use client'
import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from '../store/Redux-store'

const Navbar = () => {
     const [Nav, setNav] = useState<boolean>(false);

     const router = useRouter();

     let log = useSelector((state: RootState) => state.products.login);

     useEffect(() => {
          if (!log) router.push('/');
     }, [])

     const toggle = (): void => {
          if (innerWidth <= 1025) setNav(!Nav);
          // console.log(Nav);
          // console.log(innerWidth);
     }

     return <>
          {
               log && <div className="nav-body bg-gradient-to-r from-gray-800 to-gray-500 text-white flex z-10 h-18 items-center justify-between px-5 relative w-full">
                    <h1 className="text-2xl font-semibold text-brown-500 flex z-10"><Link href='/admin/home'>SK Edits and Crafts</Link></h1>
                    <ul className={`flex gap-7 z-0 flex-col lg:flex-row absolute lg:static pl-5 lg:pl-0 h-60 lg:h-auto ${Nav ? 'top-[80px] left-[0px] gap-7 pt-7  text-white bg-gradient-to-r from-gray-800 to-gray-500 w-full duration-500' : 'top-[-200px]'}`}>
                         <Link href="/admin/home"><li onClick={toggle}>Home</li></Link>
                         <Link href="/admin/add-product"><li onClick={toggle}>Add Product</li></Link>
                         <Link href="/admin/add-category"><li onClick={toggle}>Add Category</li></Link>
                         <a href="https://sk-crafts-and-edits-frontend.vercel.app" target="_blank"><li onClick={toggle}>Client Site</li></a>
                    </ul>
                    <div className="flex flex-col z-10">
                         <p className="opacity-[0] hidden lg:block">*******************</p>
                         <img src={Nav ? '../close.svg' : '../menu.svg'} className={`cursor-pointer lg:hidden ${Nav ? 'size-[40px]' : 'size-[40px]'}`} onClick={toggle} />
                    </div>
               </div>
          }
     </>
}

export default Navbar
