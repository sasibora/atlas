'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Truck, Search, Map, Wallet, Settings, LogOut } from 'lucide-react'

export default function DriverLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-background-dark flex flex-col">
            {/* Driver Navigation */}
            <header className="glass-nav sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2 group">
                            <div className="size-8 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <span className="font-bold text-white hidden md:block">Atlas Connect <span className="text-primary text-xs ml-1 uppercase border border-primary/20 px-1 rounded">Driver</span></span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-white border-b-2 border-primary py-5">Dashboard</Link>
                            <Link href="/marketplace" className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-5">Find Loads</Link>
                            <Link href="/trips" className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-5">My Trips</Link>
                            <Link href="/fleet" className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-5">Fleet</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={handleLogout}>
                            <LogOut size={20} />
                        </Button>
                        <div className="size-8 rounded-full bg-surface border border-primary/20"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8">
                {children}
            </main>
        </div>
    )
}
