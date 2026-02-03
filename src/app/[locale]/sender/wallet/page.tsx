'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, History } from "lucide-react"

export default function WalletPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">My Wallet</h1>
                <p className="text-gray-400 mt-1">Manage payments and view transaction history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Balance Card */}
                <Card className="md:col-span-2 bg-gradient-to-br from-[#1a262b] to-[#0f2123] border-surface">
                    <CardContent className="p-8 flex flex-col justify-between h-full min-h-[220px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 font-medium mb-1">Total Balance</p>
                                <h2 className="text-4xl font-bold text-white">MAD 12,450.00</h2>
                            </div>
                            <div className="bg-primary/20 p-3 rounded-full text-primary">
                                <Wallet size={24} />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button className="flex-1 gap-2 text-gunmetal font-bold">
                                <ArrowDownLeft size={18} />
                                Top Up
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2 text-white border-white/20 hover:bg-white/10">
                                <ArrowUpRight size={18} />
                                Withdraw
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions / Cards */}
                <Card className="bg-surface/10 border-surface">
                    <CardHeader>
                        <CardTitle className="text-lg">Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-[#0D1619] border border-surface/50">
                            <CreditCard className="text-primary" />
                            <div>
                                <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                                <p className="text-xs text-gray-500">Expires 12/26</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                            + Add New Card
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <History size={20} />
                    Recent Transactions
                </h2>

                <Card>
                    <div className="divide-y divide-surface">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-surface/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`size-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                        {i % 2 === 0 ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{i % 2 === 0 ? 'Withdrawal to Bank' : 'Top Up via Card'}</p>
                                        <p className="text-xs text-gray-500">Oct {24 - i}, 2023</p>
                                    </div>
                                </div>
                                <span className={`font-mono font-bold ${i % 2 === 0 ? 'text-white' : 'text-green-400'}`}>
                                    {i % 2 === 0 ? '-' : '+'} MAD {i * 150}.00
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
