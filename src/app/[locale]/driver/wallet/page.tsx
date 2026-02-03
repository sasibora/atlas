'use client'

import { MotionDiv } from "@/components/ui/motion"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { getWallet, getTransactions, topUpWallet } from "@/app/actions/wallet"
import {
    Wallet,
    TrendingUp,
    Plus,
    ArrowRight,
    Download,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownLeft
} from "lucide-react"
import { toast } from "sonner"

// Define types locally for now if not importing shared types
type Transaction = {
    id: string
    wallet_id: string
    amount: number
    type: 'TOPUP' | 'COMMISSION'
    status: 'PENDING' | 'COMPLETED' | 'FAILED'
    created_at: string
}

import { createClient } from "@/lib/supabase/client"

export default function WalletPage() {
    const t = useTranslations('Wallet')
    const [wallet, setWallet] = useState<{ balance: number, currency: string } | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const supabase = createClient()

    async function loadData(uid: string) {
        try {
            const walletData = await getWallet(uid) as any // Force cast to avoid 'never' inference
            if (walletData) {
                setWallet(walletData)
                const txs = await getTransactions(walletData.id)
                setTransactions(txs || [])
            }
        } catch (error) {
            console.error("Failed to load wallet data", error)
        }
    }

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserId(user.id)
                loadData(user.id)
            }
        }
        getUser()
    }, [])

    const handleTopUp = async () => {
        if (!userId) return
        setLoading(true)
        try {
            const result = await topUpWallet(userId, 500) // Simulate 500 MAD top-up
            if (result.success) {
                toast.success("Wallet topped up successfully!")
                loadData(userId) // Refresh data
            } else {
                toast.error("Top-up failed")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-6 lg:p-10 max-w-[1200px] mx-auto w-full gap-8 pb-24">
            {/* Page Header */}
            <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2"
            >
                <h1 className="text-white text-3xl md:text-4xl font-black tracking-tight">{t('title')}</h1>
                <p className="text-gray-400 text-base font-normal">{t('subtitle')}</p>
            </MotionDiv>

            {/* Dashboard Card */}
            <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full"
            >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group bg-card border border-white/5">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D1619] via-[#0D1619]/90 to-[#0D1619]/40 z-0"></div>
                    <div className="absolute -right-20 -top-20 size-64 bg-primary/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 min-h-[220px]">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Wallet className="text-gray-400" size={20} />
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{t('availableBalance')}</p>
                            </div>
                            <p className="text-white text-5xl font-bold tracking-tight">
                                {wallet ? wallet.balance.toFixed(2) : '0.00'} <span className="text-2xl text-gray-400 font-medium">{wallet?.currency || 'MAD'}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                    <TrendingUp size={14} />
                                    +12%
                                </div>
                                <span className="text-gray-400 text-sm">{t('vsLastWeek')}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={handleTopUp}
                                disabled={loading}
                                className="flex-1 md:flex-none h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-[#0D1619] text-sm font-bold tracking-wide transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={20} />
                                {loading ? 'Processing...' : t('topUp')}
                            </button>
                            <button className="flex-1 md:flex-none h-11 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2">
                                <Download size={20} />
                                {t('withdraw')}
                            </button>
                        </div>
                    </div>
                </div>
            </MotionDiv>

            {/* Filter & Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                <h3 className="text-white text-xl font-bold">{t('recentTransactions')}</h3>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/5 text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-colors">
                        <Calendar size={18} />
                        {t('last30Days')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/5 text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-colors">
                        <Filter size={18} />
                        {t('filter')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/5 text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-colors">
                        <Download size={18} />
                        {t('export')}
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-white/5 bg-card/50 overflow-hidden shadow-sm"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 w-1/4">{t('table.type')}</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 w-1/4">{t('table.date')}</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 w-1/4">{t('table.details')}</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right w-1/4">{t('table.amount')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-full border flex items-center justify-center shrink-0 ${tx.amount > 0 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                                    {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                                </div>
                                                <span className="text-white text-sm font-medium">
                                                    {tx.type === 'COMMISSION' ? t('types.commission') : t('types.topup')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {new Date(tx.created_at).toLocaleDateString()} <span className="text-xs opacity-60 ml-1">{new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {tx.type === 'COMMISSION' ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-white">Service Fee</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-white">Credit Card</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-primary' : 'text-white'}`}>
                                                {tx.amount > 0 ? '+' : ''} {tx.amount.toFixed(2)} MAD
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </MotionDiv>
        </div>
    )
}
