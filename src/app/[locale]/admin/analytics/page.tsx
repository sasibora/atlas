import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, Calendar, Download } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col h-full">
            {/* Top Header */}
            <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#0D1619]/90 backdrop-blur-md sticky top-0 z-10">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Analytics & Insights</h2>
                    <p className="text-gray-400 text-sm">Real-time performance metrics.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2 hidden md:flex">
                        <Calendar size={16} />
                        Last 30 Days
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download size={16} />
                        Export Report
                    </Button>
                </div>
            </header>

            <div className="p-8 space-y-8 overflow-y-auto flex-1">
                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* KPI 1 */}
                    <Card className="p-6 bg-[#1A262B] border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Total Earnings</p>
                                <h3 className="text-3xl font-bold text-white mt-1">€124,500</h3>
                            </div>
                            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-bold gap-1">
                                <TrendingUp size={14} />
                                +12.5%
                            </span>
                        </div>
                    </Card>

                    {/* KPI 2 */}
                    <Card className="p-6 bg-[#1A262B] border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Active Shipments</p>
                                <h3 className="text-3xl font-bold text-white mt-1">342</h3>
                            </div>
                            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-bold gap-1">
                                <TrendingUp size={14} />
                                +5.2%
                            </span>
                        </div>
                    </Card>

                    {/* KPI 3 */}
                    <Card className="p-6 bg-[#1A262B] border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Avg. Delivery Time</p>
                                <h3 className="text-3xl font-bold text-white mt-1">2.4 <span className="text-lg font-normal text-gray-500">Days</span></h3>
                            </div>
                            <span className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded text-xs font-bold gap-1">
                                <Activity size={14} />
                                0.0%
                            </span>
                        </div>
                    </Card>

                    {/* KPI 4 */}
                    <Card className="p-6 bg-[#1A262B] border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Success Rate</p>
                                <h3 className="text-3xl font-bold text-white mt-1">98.2%</h3>
                            </div>
                            <span className="flex items-center text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold gap-1">
                                <TrendingDown size={14} />
                                -0.4%
                            </span>
                        </div>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <Card className="lg:col-span-2 bg-[#1A262B] border-white/5 p-6 h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white">Monthly Revenue</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="size-3 rounded-full bg-primary"></span> Revenue
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="size-3 rounded-full bg-emerald-500"></span> Volume
                                </div>
                            </div>
                        </div>

                        {/* Simplified CSS Chart */}
                        <div className="flex items-end justify-between h-[300px] w-full gap-2 pt-8">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                                <div key={month} className="flex-1 flex flex-col items-center justify-end gap-2 h-full group">
                                    <div className="flex gap-1 items-end h-[85%] w-full justify-center">
                                        <div style={{ height: `${Math.random() * 50 + 40}%` }} className="w-3 bg-primary rounded-t-sm group-hover:bg-primary/80 transition-all"></div>
                                        <div style={{ height: `${Math.random() * 50 + 30}%` }} className="w-3 bg-emerald-500/80 rounded-t-sm group-hover:bg-emerald-500 transition-all"></div>
                                    </div>
                                    <span className="text-xs text-gray-500">{month}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Top Routes */}
                    <Card className="bg-[#1A262B] border-white/5 p-6 h-[400px] flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Top Routes</h3>
                        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                { from: 'Casablanca', to: 'Paris', count: 1204, value: '84k', pct: 85 },
                                { from: 'Tangier', to: 'Madrid', count: 945, value: '62k', pct: 65 },
                                { from: 'Agadir', to: 'London', count: 512, value: '41k', pct: 45 },
                                { from: 'Rabat', to: 'Lyon', count: 320, value: '28k', pct: 30 },
                                { from: 'Marrakech', to: 'Berlin', count: 180, value: '19k', pct: 15 },
                            ].map((route) => (
                                <div key={route.from} className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#2C3B42] rounded-full p-1.5 text-primary">
                                                <TrendingUp size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{route.from} &rarr; {route.to}</p>
                                                <p className="text-xs text-gray-500">{route.count} Shipments</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-white">€{route.value}</span>
                                    </div>
                                    <div className="w-full bg-[#2C3B42] rounded-full h-1.5">
                                        <div
                                            className="bg-primary h-1.5 rounded-full"
                                            style={{ width: `${route.pct}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
