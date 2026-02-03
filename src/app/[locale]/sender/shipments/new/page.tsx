'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, Package, Weight, Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewShipmentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // This would handle form submission to Supabase
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            router.push('/dashboard')
        }, 1500)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-white">New Shipment Request</h1>
                <p className="text-gray-400 mt-1">Post a request for drivers to bid on.</p>
            </div>

            <Card className="bg-[#1a262b] border-surface">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Route */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                Route Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase">Pickup Location</label>
                                    <Input placeholder="e.g. Paris, France" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase">Dropoff Destination</label>
                                    <Input placeholder="e.g. Casablanca, Morocco" required />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-surface/50 my-6"></div>

                        {/* Shipment Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Package size={18} className="text-primary" />
                                Package Details
                            </h3>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 uppercase">Description</label>
                                <Input placeholder="What are you sending? (e.g. Electronics, Clothes)" required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase flex items-center gap-2">
                                        Weight
                                        <Info size={12} />
                                    </label>
                                    <div className="relative">
                                        <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                        <Input type="number" placeholder="0" className="pl-12" required />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">kg</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase">Item Type</label>
                                    <select className="flex h-14 w-full rounded-xl border border-surface bg-[#0f2123] px-4 py-2 text-base text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                                        <option value="NORMAL">Normal</option>
                                        <option value="ELECTRONICS">Electronics</option>
                                        <option value="DOCUMENTS">Documents</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-surface/50 my-6"></div>

                        {/* Date */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                Timing
                            </h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 uppercase">Preferred Pickup Date</label>
                                <Input type="date" required className="w-full md:w-1/2" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? 'Publishing Request...' : 'Publish Shipment Request'}
                            </Button>
                            <p className="text-center text-xs text-gray-500 mt-4">
                                By publishing, you agree to our Terms of Service and prohibited items policy.
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
