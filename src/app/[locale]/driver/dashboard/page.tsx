'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Truck,
    Wallet,
    TrendingUp,
    Plus,
    Clock,
    CheckCircle,
    ArrowRight,
    Calendar,
    Map as MapIcon,
    ChevronRight,
    MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/ui/motion"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getWallet } from "@/app/actions/wallet"

import { createClient } from "@/lib/supabase/client"

export default function DriverDashboard() {
    const t = useTranslations('Dashboard')
    const [wallet, setWallet] = useState<{ balance: number, currency: string } | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserId(user.id)
                // Load wallet for this user
                try {
                    const data = await getWallet(user.id)
                    if (data) setWallet(data)
                } catch (error) {
                    console.error("Failed to load wallet", error)
                }
            }
        }
        loadData()
    }, [])

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto pb-12">
            {/* Header */}
            <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1"
            >
                <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">{t('title')}</h2>
                <p className="text-gray-400 text-sm">{t('welcome')}</p>
            </MotionDiv>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Wallet Card */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 lg:col-span-1 relative flex flex-col justify-between gap-4 rounded-2xl p-6 bg-card border border-white/5 shadow-lg overflow-hidden group"
                >
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-400 opacity-80"></div>
                    <div className="absolute -bottom-10 -right-10 size-32 bg-primary/10 rounded-full blur-2xl"></div>

                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400 text-sm font-medium">{t('walletBalance')}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-white text-3xl font-bold tracking-tight">
                                    {wallet ? `${wallet.balance.toFixed(2)} ${wallet.currency}` : '---'}
                                </h3>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                            <TrendingUp size={14} />
                            +12%
                        </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 z-10">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors border border-white/10">
                            <Plus size={18} />
                            {t('topUp')}
                        </button>
                    </div>
                </MotionDiv>

                {/* Pending Actions Card */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col justify-between gap-2 rounded-2xl p-6 bg-card border border-white/5 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <Clock size={24} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-400 text-sm font-medium">{t('pendingRequests')}</p>
                            <h3 className="text-white text-2xl font-bold">3</h3>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{t('urgentPickups')}</div>
                </MotionDiv>

                {/* Completed Card */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col justify-between gap-2 rounded-2xl p-6 bg-card border border-white/5 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <CheckCircle size={24} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-400 text-sm font-medium">{t('completedJobs')}</p>
                            <h3 className="text-white text-2xl font-bold">142</h3>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{t('last30Days')}</div>
                </MotionDiv>
            </div>

            {/* Manifests Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-bold leading-tight tracking-tight">{t('manifests')}</h3>
                    <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">{t('viewAll')}</button>
                </div>

                <div className="flex flex-col gap-3">
                    {/* Manifest Item 1 */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors cursor-pointer group"
                    >
                        {/* Left: Route Info */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="size-12 rounded-full border-2 border-white/10 bg-gray-800 overflow-hidden relative">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbKgdXUplNWaXd-lb8cyCr4QuO0gefyhWSdmDXnEYaRi2NvlPoW7qLMQDuW9brZlqFJMYDi0jFE460gylmShsjtCHXQQwygxKXr7Mt2I75abpSukYybGmqpvpBMq3a41uJBfUH0q5rtjXy9Qu8KcAgEQkFOj399rmOksPnTXWXO-69BmUX4xb7WDkDVHzww-_viaVRNS2gcoYblMWfe0m0t1J-2cyeVVu2GuEzSnLMw0Y5PYOzMRYPJf7_JF5DbLVggtJVE5RCNqaB" className="w-full h-full object-cover" alt="Logo" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-white font-semibold">
                                    <span>Casablanca</span>
                                    <ArrowRight size={14} className="text-gray-400" />
                                    <span>Paris</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        Oct 24, 10:00 AM
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Truck size={16} />
                                        1200 km
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Right: Badges & Action */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300">
                                    10kg
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                    Pending
                                </span>
                            </div>
                            <button className="text-gray-500 group-hover:text-white transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </MotionDiv>

                    {/* Manifest Item 2 */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="size-12 rounded-full border-2 border-white/10 bg-gray-800 overflow-hidden relative">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDPIzjQB5TGh-RuawWNRCqMhMmnOvAa-WEuxb149wcap8pj2kub178JitGSzARlocZeyqmJ9zGO5yTBiy7bhN5yq9iaUfSJg0tsHzKGaagUZB6oahcjI_8WBJjFtAD0JA4Yii2yx4MyNM5yR5nuUhvoXJZ4k2ng8BtVF5DjVROF6k3JUdqqa1xQjE7eRn6WgC8pH6eKfH7EGSy2IwIPFOHoZtSqiBu59mgl984WWs6FuZr4C0x4faavVkFI4I1I4Ly0xWTYmJ5fp-7" className="w-full h-full object-cover" alt="Logo" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-white font-semibold">
                                    <span>Tangier</span>
                                    <ArrowRight size={14} className="text-gray-400" />
                                    <span>Madrid</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        Oct 25, 08:30 AM
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Truck size={16} />
                                        650 km
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300">
                                    150kg
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                    Accepted
                                </span>
                            </div>
                            <button className="text-gray-500 group-hover:text-white transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            {/* Map Preview Section */}
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl overflow-hidden bg-card border border-white/5 h-64 relative group cursor-pointer"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp1BSRwakRSzrZNcJlHg-pjE_aRrxuPG-7f_nA0x1hfYSkNp86SA4A8yo5qNI8cU3XI_LagCVQy_2_YRj1Y7J1GsnKAbFN8g7vcFpx55w_oH1cTSbi32uBx8xSc-w99JWGhC5D_RKGVjFrvsDvq1Jo8IZi8XIKx1Szd2uCSiGZdohB5Brk-KNru40R4D7l1NNac203zwh2L3yWcPn4iEA30Ur1kBwz5fmy2gEymP5uST3mOoyU8rQxEAbxYZ9iNlYe4wnPLrlSBR1G")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                        <p className="text-white font-bold text-lg">{t('activeRoutes')}</p>
                        <p className="text-gray-300 text-sm">{t('visualiseJourney')}</p>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95">
                        <MapIcon size={24} />
                    </button>
                </div>
            </MotionDiv>
        </div>
    )
}
