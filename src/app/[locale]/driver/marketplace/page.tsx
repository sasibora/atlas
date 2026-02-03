import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Filter, ArrowRight } from "lucide-react"

export default function MarketplacePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Marketplace</h1>
                    <p className="text-gray-400 mt-1">Find shipments matching your routes.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-[#1a262b] p-4 rounded-xl border border-surface flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input placeholder="Origin (e.g. Paris)" className="pl-10 bg-gunmetal border-none" />
                </div>
                <div className="w-px bg-surface hidden md:block"></div>
                <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input placeholder="Destination (e.g. Casablanca)" className="pl-10 bg-gunmetal border-none" />
                </div>
                <Button size="lg" className="w-full md:w-auto">
                    <Search className="mr-2 size-4" />
                    Find Loads
                </Button>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="hover:border-primary/50 transition-all cursor-pointer group">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <Search size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Furniture</p>
                                        <p className="text-xs text-gray-500">Electronics Type</p>
                                    </div>
                                </div>
                                <span className="bg-surface text-white text-xs px-2 py-1 rounded font-medium">Pending</span>
                            </div>

                            <div className="space-y-3 relative">
                                {/* Route Line */}
                                <div className="absolute left-[5px] top-[24px] bottom-[24px] w-0.5 bg-surface border-l border-dashed border-gray-600"></div>

                                <div className="flex items-start gap-4">
                                    <div className="size-3 rounded-full bg-primary shrink-0 mt-1"></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Pickup</p>
                                        <p className="text-sm font-bold text-white">Paris, France</p>
                                        <p className="text-xs text-gray-500">Oct 24</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="size-3 rounded-full border-2 border-primary bg-transparent shrink-0 mt-1"></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Dropoff</p>
                                        <p className="text-sm font-bold text-white">Rabat, Morocco</p>
                                        <p className="text-xs text-gray-500">Flexible</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface">
                                <div>
                                    <p className="text-xs text-gray-400">Offer Price</p>
                                    <p className="text-xl font-bold text-primary">€250</p>
                                </div>
                                <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-gunmetal group-hover:border-primary">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
