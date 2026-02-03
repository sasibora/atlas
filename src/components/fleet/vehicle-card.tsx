import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, User, Settings, Truck } from "lucide-react"

interface VehicleProps {
    name: string
    plate: string
    status: 'In Transit' | 'Idle' | 'Maintenance'
    driverName?: string
    driverId?: string
    image: string
}

export function VehicleCard({ name, plate, status, driverName, driverId, image }: VehicleProps) {
    const statusColors = {
        'In Transit': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
        'Idle': 'bg-slate-500/20 text-slate-400 border-slate-500/20',
        'Maintenance': 'bg-orange-500/20 text-orange-400 border-orange-500/20'
    }

    const statusDot = {
        'In Transit': 'bg-emerald-400',
        'Idle': 'bg-slate-400',
        'Maintenance': 'bg-orange-400'
    }

    return (
        <Card className="overflow-hidden bg-[#1A262B] border-white/5 hover:border-primary/30 transition-all group">
            <div className="h-32 w-full bg-cover bg-center relative" style={{ backgroundImage: `url('${image}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A262B] to-transparent"></div>
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold backdrop-blur-sm border flex items-center gap-1 ${statusColors[status]}`}>
                        <span className={`size-1.5 rounded-full ${statusDot[status]} ${status === 'In Transit' ? 'animate-pulse' : ''}`}></span>
                        {status}
                    </span>
                </div>
            </div>

            <div className="p-4 pt-2">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h4 className="text-white font-bold text-lg leading-tight">{name}</h4>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mt-1">Plate: {plate}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary">
                        {status === 'Maintenance' ? <Settings size={18} /> : <MapPin size={18} />}
                    </Button>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-gray-400">
                        <User size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-300 text-sm font-medium">{driverName || 'Unassigned'}</span>
                        <span className="text-gray-500 text-xs">{driverId ? `Driver ID: #${driverId}` : 'No Active Driver'}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
