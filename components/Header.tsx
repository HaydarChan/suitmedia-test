'use client'
// Library Import
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image"
import Link from "next/link";
// Asset Import
import SuitmediaLogo from '@/public/suitmedia.png'

interface NavItem {
    label: string;
    route: string;
}

const navItems: NavItem[] = [
    {
        label: "Work",
        route: "/work"
    },
    {
        label: "About",
        route: "/about"
    },
    {
        label: "Services",
        route: "/services"
    },
    {
        label: "Ideas",
        route: "/ideas"
    },
    {
        label: "Careers",
        route: "/careers"
    },
    {
        label: "Contact",
        route: "/contact"
    }
]

const Header = () => {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <div 
            className={`fixed top-0 left-0 w-full bg-[#FF6400]/90 backdrop-blur-sm transition-all duration-300 z-50 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="flex flex-col items-center px-24 py-4">
                <nav className="w-full flex items-center justify-between">
                    <Image 
                        src={SuitmediaLogo}
                        alt="Suitmedia Logo"
                        className="w-[120px]"
                    />
                    <ul className="flex gap-8">
                        {navItems.map((item, index) => (
                            <li key={index} className="relative">
                                {pathname === item.route && (
                                    <div className="w-full h-4 bg-white" />
                                )}
                                <Link href={item.route} className="text-white">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header