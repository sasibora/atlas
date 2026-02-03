'use client'

import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Truck, Users, Map, BarChart, FileText, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Fleet Status', href: '/admin/fleet', icon: Truck },
        { name: 'Drivers', href: '/admin/drivers', icon: Users },
        { name: 'Live Map', href: '/admin/map', icon: Map },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
        { name: 'Invoices', href: '/admin/invoices', icon: FileText },
    ]

    return (
        <div className="flex min-h-screen bg-gunmetal">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1A262B] border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                        A
                    </div>
                    <div>
                        <h1 className="text-white font-bold leading-tight">Atlas Connect</h1>
                        <p className="text-primary text-xs font-medium">Admin Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={20} className={cn(isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                                <span className={cn("text-sm font-medium", isActive && "font-bold")}>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                        <Settings size={20} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 mt-2">
                        <div className="size-8 rounded-full bg-slate-700 border border-white/10"></div>
                        <div>
                            <p className="text-white text-xs font-semibold">Admin User</p>
                            <p className="text-gray-500 text-[10px]">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-hidden">
                {children}
            </main>
        </div>
    )
}
