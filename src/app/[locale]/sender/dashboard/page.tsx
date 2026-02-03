'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Search,
    MapPin,
    Calendar,
    Filter,
    ArrowUpDown,
    Star,
    ArrowRight,
    Package2,
    Plus,
    X
} from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/ui/motion"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { toast } from "sonner"

import { bookAndCompleteShipment } from "@/app/actions/shipment"

import { createClient } from "@/lib/supabase/client"

export default function SenderDashboard() {
    const t = useTranslations('Sender')
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const supabase = createClient()

    // Hardcoded Driver ID for demo (as we don't have search logic yet)
    const DEMO_DRIVER_ID = 'demo-driver-id'

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) setUserId(user.id)
        }
        getUser()
    }, [])

    const handleSearch = () => {
        toast.info("Search functionality pending backend integration")
    }

    const handleBook = async (price: number, origin: string, dest: string) => {
        if (!userId) {
            toast.error("Please log in to book")
            return
        }
        setLoading(true)
        try {
            const result = await bookAndCompleteShipment(
                userId,
                DEMO_DRIVER_ID,
                origin,
                dest,
                price
            )

            if (result.success) {
                if (result.warning) {
                    toast.warning(result.message)
                } else {
                    toast.success(`Booking Confirmed! Commission of ${(price * 0.10).toFixed(2)} MAD deducted from Driver.`)
                }
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Booking failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center w-full pb-12">
            {/* Hero / Search Section */}
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center mb-10"
            >
                <h1
                    className="text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight text-center pb-8 pt-4"
                    dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                />

                {/* Floating Glass Search Bar */}
                <div className="w-full max-w-5xl bg-gunmetal/80 backdrop-blur-md border border-[#2d565e] rounded-2xl p-4 shadow-2xl shadow-black/40">
                    <div className="flex flex-col lg:flex-row gap-4 items-end">
                        {/* From */}
                        <div className="w-full lg:flex-1">
                            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider ml-1">{t('search.from')}</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                    <div className="size-3 rounded-full border-2 border-current"></div>
                                </div>
                                <input
                                    className="w-full h-14 bg-[#0f2123] text-white placeholder-gray-500 rounded-xl border border-[#20464b] focus:border-primary focus:ring-1 focus:ring-primary pl-12 pr-4 text-base transition-all outline-none"
                                    placeholder={t('search.placeholderFrom')}
                                    type="text"
                                    defaultValue="Paris, France"
                                />
                            </div>
                        </div>
                        {/* To */}
                        <div className="w-full lg:flex-1">
                            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider ml-1">{t('search.to')}</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                    <MapPin size={20} />
                                </div>
                                <input
                                    className="w-full h-14 bg-[#0f2123] text-white placeholder-gray-500 rounded-xl border border-[#20464b] focus:border-primary focus:ring-1 focus:ring-primary pl-12 pr-4 text-base transition-all outline-none"
                                    placeholder={t('search.placeholderTo')}
                                    type="text"
                                    defaultValue="Casablanca, Morocco"
                                />
                            </div>
                        </div>
                        {/* Date */}
                        <div className="w-full lg:w-48">
                            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider ml-1">{t('search.date')}</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                    <Calendar size={20} />
                                </div>
                                <input
                                    className="w-full h-14 bg-[#0f2123] text-white placeholder-gray-500 rounded-xl border border-[#20464b] focus:border-primary focus:ring-1 focus:ring-primary pl-12 pr-4 text-base transition-all outline-none"
                                    placeholder={t('search.placeholderDate')}
                                    type="text"
                                    defaultValue="Oct 24, 2023"
                                />
                            </div>
                        </div>
                        {/* Search Button */}
                        <button onClick={handleSearch} className="w-full lg:w-auto h-14 px-8 bg-primary hover:bg-[#00a0b5] text-[#0f2124] rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,189,214,0.3)] hover:scale-105 active:scale-95 duration-200">
                            <Search size={20} />
                            <span>{t('search.btn')}</span>
                        </button>
                    </div>
                </div>
            </MotionDiv>

            {/* Results Grid */}
            <div className="w-full max-w-6xl mt-6 px-4 md:px-0">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-xl font-bold">{t('results.title')}</h3>
                    <div className="flex gap-2">
                        <button className="p-2 text-primary bg-[#20464b]/30 rounded-lg hover:bg-[#20464b] transition-colors">
                            <Filter size={20} />
                        </button>
                        <button className="p-2 text-gray-400 bg-[#20464b]/30 rounded-lg hover:bg-[#20464b] transition-colors">
                            <ArrowUpDown size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="group bg-card border border-[#20464b] rounded-2xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-[#20464b] overflow-hidden">
                                    <img alt="Driver" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvaQkKf6tDQ0sAvyxQ8U1xCzCUMxpP5HydIu02r6l6WtAdoQYzhfOGruUBWHoY3lSrv_g6gTDsjNSWaH6hBOV4wPxqnlVUztdkHCS5Q6h8WCPcWgi_R6jiDye3YkuPekLvrQPRsVqBgNb7ONJQJ4erC_y-RKAVkbhkqFiwYzWfJtlzQNhmOJ_ndS1HbF0UNS7Aekkwb95fl88pGQHk5irC8AsoFVrCvmln3JCmJeubQ2XaIU3ezPjs-neiY3ecwn9ouWNpvEquTV1X" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Ahmed Benali</p>
                                    <div className="flex items-center text-xs text-yellow-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="ml-1 font-medium">4.9</span>
                                        <span className="text-gray-500 ml-1">(124 {t('results.trips')})</span>
                                    </div>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">{t('results.verified')}</span>
                        </div>

                        <div className="bg-[#0f2123] rounded-xl p-4 mb-4 border border-[#20464b]/50">
                            <div className="flex items-start gap-3 mb-3 relative">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                    <div className="size-2.5 rounded-full bg-primary"></div>
                                    <div className="w-0.5 h-8 bg-[#20464b] border-l border-dashed border-gray-600"></div>
                                    <div className="size-2.5 rounded-full border-2 border-primary bg-transparent"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-3">
                                        <p className="text-gray-400 text-xs mb-0.5">{t('results.pickup')}</p>
                                        <p className="text-white font-medium text-sm">Paris, FR</p>
                                        <p className="text-gray-500 text-xs">Oct 24, 08:00 AM</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-0.5">{t('results.dropoff')}</p>
                                        <p className="text-white font-medium text-sm">Casablanca, MA</p>
                                        <p className="text-gray-500 text-xs">Oct 26, 14:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#20464b]">
                            <div className="flex flex-col">
                                <span className="text-gray-400 text-xs">{t('results.offerPrice')}</span>
                                <span className="text-primary text-xl font-bold">€1,250</span>
                            </div>
                            <button onClick={() => handleBook(1250, 'Paris, FR', 'Casablanca, MA')} className="bg-[#20464b] hover:bg-primary hover:text-gunmetal text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                <span>{t('results.bookNow')}</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </MotionDiv>

                    {/* Card 2 */}
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="group bg-card border border-[#20464b] rounded-2xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-[#20464b] overflow-hidden">
                                    <img alt="Driver" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-kpE_ZXI0k3sbV0Mnz-mtYHttCt6CYZ4vqYkb-QptyQflRCvrfOhhkrmdhDGDrQcrqPSAjqmWGBfI21cMQ4o72fYrtPN4XQfIsU3_Ao-Q07B4QBH7Qr3oYY015ZQ5j7AgZ0eG3Alz36ERMF25Ur9eGd1ll3EagjQD_UZmRQiBXm4cU4p_qcleEIComZ1ApdF7ts9EgHwuTI-l7cCQF1teXKcul_opOXtzG-vB0Bwm88LpBRSIeqdlufv-Pzfo_6V8qd5KBTL6wPXo" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Sarah Jenkins</p>
                                    <div className="flex items-center text-xs text-yellow-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="ml-1 font-medium">4.8</span>
                                        <span className="text-gray-500 ml-1">(86 {t('results.trips')})</span>
                                    </div>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">{t('results.pro')}</span>
                        </div>

                        <div className="bg-[#0f2123] rounded-xl p-4 mb-4 border border-[#20464b]/50">
                            <div className="flex items-start gap-3 mb-3 relative">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                    <div className="size-2.5 rounded-full bg-primary"></div>
                                    <div className="w-0.5 h-8 bg-[#20464b] border-l border-dashed border-gray-600"></div>
                                    <div className="size-2.5 rounded-full border-2 border-primary bg-transparent"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-3">
                                        <p className="text-gray-400 text-xs mb-0.5">{t('results.pickup')}</p>
                                        <p className="text-white font-medium text-sm">Lyon, FR</p>
                                        <p className="text-gray-500 text-xs">Oct 25, 09:00 AM</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-0.5">{t('results.dropoff')}</p>
                                        <p className="text-white font-medium text-sm">Tangier, MA</p>
                                        <p className="text-gray-500 text-xs">Oct 26, 18:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#20464b]">
                            <div className="flex flex-col">
                                <span className="text-gray-400 text-xs">{t('results.offerPrice')}</span>
                                <span className="text-primary text-xl font-bold">€980</span>
                            </div>
                            <button onClick={() => handleBook(980, 'Lyon, FR', 'Tangier, MA')} className="bg-[#20464b] hover:bg-primary hover:text-gunmetal text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                <span>{t('results.bookNow')}</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </MotionDiv>

                    {/* Empty State / Add Request */}
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="group bg-[#0f2123] border border-dashed border-[#20464b] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all duration-300 min-h-[300px] cursor-pointer"
                    >
                        <div className="size-16 rounded-full bg-[#20464b]/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-gunmetal transition-colors">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{t('results.emptyTitle')}</h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-[200px]">{t('results.emptyText')}</p>
                        <button className="text-primary font-bold text-sm group-hover:text-white transition-colors">{t('results.createRequest')} &rarr;</button>
                    </MotionDiv>
                </div>
            </div>

            {/* Bottom Map Preview */}
            <div className="w-full max-w-6xl mt-16 mb-8 rounded-2xl overflow-hidden border border-[#20464b] relative h-[300px] mx-4 md:mx-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp1BSRwakRSzrZNcJlHg-pjE_aRrxuPG-7f_nA0x1hfYSkNp86SA4A8yo5qNI8cU3XI_LagCVQy_2_YRj1Y7J1GsnKAbFN8g7vcFpx55w_oH1cTSbi32uBx8xSc-w99JWGhC5D_RKGVjFrvsDvq1Jo8IZi8XIKx1Szd2uCSiGZdohB5Brk-KNru40R4D7l1NNac203zwh2L3yWcPn4iEA30Ur1kBwz5fmy2gEymP5uST3mOoyU8rQxEAbxYZ9iNlYe4wnPLrlSBR1G")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2123] via-[#0f2123]/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 z-10">
                    <h3 className="text-white text-xl font-bold mb-2">{t('map.popularRoutes')}</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#20464b] rounded-full text-xs text-white border border-white/10">Paris ⇄ Casablanca</span>
                        <span className="px-3 py-1 bg-[#20464b] rounded-full text-xs text-white border border-white/10">Madrid ⇄ Tangier</span>
                        <span className="px-3 py-1 bg-[#20464b] rounded-full text-xs text-white border border-white/10">Lyon ⇄ Marrakech</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
