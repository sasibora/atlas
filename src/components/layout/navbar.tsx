'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Menu, X, LogOut, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            subscription.unsubscribe()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [supabase.auth])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-16' : 'bg-transparent h-24'}`}
        >
            <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative size-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-3 group-hover:rotate-6 transition-transform"></div>
                            <div className="relative size-10 bg-gradient-to-br from-gunmetal to-[#1A262B] border border-primary/30 rounded-xl flex items-center justify-center text-primary shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-white leading-none">Atlas<span className="text-primary">Connect</span></span>
                            <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Logistics Platform</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <nav className="flex gap-6">
                            {['How it works', 'Pricing', 'Tracking', 'Support'].map((item) => (
                                <Link key={item} href="#" className="text-sm font-medium text-gray-400 hover:text-white hover:text-glow transition-all relative group">
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>
                        <div className="flex gap-4 items-center pl-6 border-l border-white/10">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/dashboard">
                                        <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                            Dashboard <ChevronRight size={16} className="ml-1" />
                                        </Button>
                                    </Link>
                                    <Button onClick={handleLogout} variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 hover:bg-red-400/10">
                                        <LogOut size={18} />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/5">Log In</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass-nav border-t border-white/5 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {['How it works', 'Pricing', 'Tracking', 'Support'].map((item) => (
                                <Link key={item} href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors block py-2">
                                    {item}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2"></div>
                            {user ? (
                                <div className="flex flex-col gap-3">
                                    <Link href="/dashboard">
                                        <Button className="w-full">Dashboard</Button>
                                    </Link>
                                    <Button onClick={handleLogout} variant="destructive" className="w-full">Sign Out</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/login">
                                        <Button variant="ghost" className="w-full text-white hover:text-primary justify-start">Log In</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button variant="outline" className="w-full">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
