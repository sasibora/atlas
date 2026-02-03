'use client'

import React from 'react'
import Link from 'next/link'
import { Settings, Shield, BadgeCheck, Bell, ChevronRight, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { name: 'General', href: '/settings', icon: Settings },
        { name: 'Security', href: '/settings/security', icon: Shield },
        { name: 'Verification', href: '/settings/verification', icon: BadgeCheck },
        { name: 'Notifications', href: '/settings/notifications', icon: Bell },
    ]

    return (
        <div className="flex min-h-screen bg-gunmetal/50">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1A262B] border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="p-6 pb-4 border-b border-white/5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white leading-tight">Atlas Connect</span>
                            <span className="text-[10px] text-gray-500 font-medium">SETTINGS</span>
                        </div>
                    </Link>
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
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-gray-400">
                            <User size={16} />
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">User Settings</p>
                            <p className="text-gray-500 text-[10px]">Manage Profile</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 min-h-screen relative">
                {children}
            </main>
        </div>
    )
}
