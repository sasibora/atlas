'use client'

import { MotionDiv } from "@/components/ui/motion"
import { useTranslations } from "next-intl"
import {
    MapPin,
    MessageSquare,
    Package,
    Verified,
    Star,
    Truck,
    CheckCircle,
    Calendar,
    MoreHorizontal
} from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function ProfilePage() {
    const t = useTranslations('Profile')
    const tStats = useTranslations('Profile.stats')
    const [userId, setUserId] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) setUserId(user.id)
        }
        getUser()
    }, [])

    return (
        <div className="flex flex-col p-6 lg:p-10 max-w-[1200px] mx-auto w-full gap-8 pb-24">

            {/* Profile Header */}
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-between p-4"
            >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative group">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-card bg-gray-800 shadow-xl overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDT-NIit4Oqy4S3AbuPZfrbtngvS9L-sPneHMa7WLVeWkY4p-U4jiL-pX1meij-YfaJZiEdF_OjfOf5m7Ydz5EcqyjVQyg4T6YFcDgtkjio8QP9MAW_CETRlzBjpuo_FS7G1Z4wo2kgRo6lL5mdSpLNmHjTxIGeHwUSXsR5zO93QCya_OyK8toV9VqDqiL1VMZPOSNAx5yNH8hy8Gfk-zPmbAe1WjycKTvhdcCP_Dgir4VPhrvy5XqYmw4fnZrqzC8jrWpLFpq4St" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-gunmetal rounded-full p-1 border border-white/10">
                            <Verified className="text-primary" size={20} fill="currentColor" strokeWidth={1} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">Hassan Benali</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                                {t('verifiedDriver')}
                            </span>
                            <span className="text-gray-400 text-sm font-normal">•</span>
                            <span className="text-gray-400 text-sm font-normal flex items-center gap-1">
                                <MapPin size={14} />
                                {t('location')}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-md text-center md:text-left mt-2">
                            {t('bio')}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none min-w-[120px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-card border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all">
                        {t('message')}
                    </button>
                    <button className="flex-1 md:flex-none min-w-[140px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-primary text-gunmetal text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        {t('bookShipment')}
                    </button>
                </div>
            </MotionDiv>

            {/* Stats & Score Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Trust Score Card */}
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 flex flex-col items-center justify-center bg-card rounded-2xl p-8 border border-white/5 relative overflow-hidden shadow-lg group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <Verified size={120} />
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6 z-10">{t('trustScore')}</h3>

                    {/* Gauge Visualization */}
                    <div className="relative size-40 flex items-center justify-center mb-4 z-10">
                        {/* Outer Gradient Ring */}
                        <div className="absolute inset-0 rounded-full transform -rotate-90" style={{ background: 'conic-gradient(#00BDD6 98%, #1f2937 0)' }}></div>
                        {/* Inner Circle Mask */}
                        <div className="absolute inset-[3px] bg-card rounded-full flex flex-col items-center justify-center">
                            <Star className="text-amber-500 mb-1" size={32} fill="currentColor" strokeWidth={0} />
                            <span className="text-4xl font-bold text-white tracking-tight">4.9</span>
                            <span className="text-xs text-gray-400">{t('outOf5')}</span>
                        </div>
                    </div>
                    <p className="text-primary text-sm font-medium z-10 bg-primary/10 px-3 py-1 rounded-full">{t('topRated')}</p>
                </MotionDiv>

                {/* Key Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center items-center gap-2 rounded-2xl bg-card border border-white/5 p-6 hover:border-primary/50 transition-colors"
                    >
                        <div className="p-3 rounded-full bg-white/5 text-primary mb-1">
                            <Truck size={24} />
                        </div>
                        <p className="text-white tracking-tight text-3xl font-bold leading-tight">124</p>
                        <p className="text-gray-400 text-sm font-normal">{tStats('shipments')}</p>
                    </MotionDiv>

                    {/* Stat 2 */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col justify-center items-center gap-2 rounded-2xl bg-card border border-white/5 p-6 hover:border-emerald-500/50 transition-colors"
                    >
                        <div className="p-3 rounded-full bg-white/5 text-emerald-400 mb-1">
                            <CheckCircle size={24} />
                        </div>
                        <p className="text-white tracking-tight text-3xl font-bold leading-tight">99%</p>
                        <p className="text-gray-400 text-sm font-normal">{tStats('successRate')}</p>
                    </MotionDiv>

                    {/* Stat 3 */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col justify-center items-center gap-2 rounded-2xl bg-card border border-white/5 p-6 hover:border-purple-500/50 transition-colors"
                    >
                        <div className="p-3 rounded-full bg-white/5 text-purple-400 mb-1">
                            <Calendar size={24} />
                        </div>
                        <p className="text-white tracking-tight text-3xl font-bold leading-tight">2022</p>
                        <p className="text-gray-400 text-sm font-normal">{tStats('memberSince')}</p>
                    </MotionDiv>

                    {/* Detailed Metric Bar */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-3 bg-card rounded-2xl border border-white/5 p-6 flex flex-col justify-center gap-3"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm font-medium">{t('metrics.onTime')}</span>
                            <span className="text-primary font-bold">98.5%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '98.5%' }}></div>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">{t('reviews.title')}</h2>
                    <a className="text-primary text-sm font-medium hover:underline cursor-pointer">{t('reviews.viewAll')}</a>
                </div>

                <div className="flex flex-col gap-3">
                    {/* Review 1 */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="group flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-card border border-white/5 hover:bg-white/5 transition-colors"
                    >
                        <div className="size-12 shrink-0 rounded-full overflow-hidden border border-white/10 bg-gray-800">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe_WtqZ2Gc0C0WEDMfRZuiMBy122T7AGeny1El8tf2wxi52guKFkVOyNEi8CJrzul51vsAQD1U5PZFg-z4PJsab_IhupcxNr78pIZnQgBd4BMCl2qQiC9QEgFgFU4Ui7Qp2LVQQLmla8Ky88KXHZAhUvj0wO9G4o0SBH1wtdEYg3mSXIWHBioukG63lZcztUAdPmEl2m2ZkKqIhR80eLptn3yn7-BjxRkbqdCiM_B8z_Axz1f7PkIIBRqyRDGA22BZw3z_aig1O9or" alt="Reviewer" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h4 className="text-white font-semibold text-base">Jean-Pierre Dubois</h4>
                                <span className="text-gray-500 text-xs">2 days ago • Logistics Manager</span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-500" fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">"Very professional and fast. Hassan handled the customs clearance documents perfectly. The goods arrived in Paris ahead of schedule."</p>
                        </div>
                    </MotionDiv>

                    {/* Review 2 */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="group flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-card border border-white/5 hover:bg-white/5 transition-colors"
                    >
                        <div className="size-12 shrink-0 rounded-full overflow-hidden border border-white/10 bg-gray-800">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZjvZhts7GpY4rVrOtFNK8J6A5bAoTkXDv2qBVgFB0-niBv4loDhrGfX0kOBSdJwE2_JEIdkKOoycnnZUnBmX4jXxoj65cRbA6GP7LwKjIKxfS-s6AWYRosZpAyO_WgJtmRTawov9CdWjbWRj65AeoK51LTSik1Z74TMk5tVJ0S4cJ9OQdCCPNfwvw2-XOnEFCYgXuxp2L0ZIH5lq-fuVr5s7lFlS3Nva1tHpZnZfpxCL4YOZP0JNKAR31HVLEnKqZbSheRCDLaC7J" alt="Reviewer" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h4 className="text-white font-semibold text-base">Elena Rossi</h4>
                                <span className="text-gray-500 text-xs">1 week ago • Supply Chain Lead</span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-500" fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">"Great communication throughout the journey from Tangier to Madrid. The temperature logs were perfect for our perishable goods."</p>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </div>
    )
}
