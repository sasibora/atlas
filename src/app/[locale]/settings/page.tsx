import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, MapPin } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">General Settings</h1>
                <p className="text-gray-400 mt-1">Manage your account details and profile information.</p>
            </div>

            <Card className="p-8 bg-[#1A262B] border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

                <div className="flex items-start gap-8 mb-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="size-24 rounded-full bg-slate-700 flex items-center justify-center text-gray-400 text-3xl font-bold border-4 border-[#0D1619]">
                            MK
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">Change Photo</Button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><User size={18} /></span>
                                <Input defaultValue="Mehdi K." className="pl-10 bg-black/20 border-white/10 text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Role</label>
                            <Input defaultValue="Logistics Manager" disabled className="bg-white/5 border-white/5 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Mail size={18} /></span>
                                <Input defaultValue="mehdi@atlasconnect.ma" className="pl-10 bg-black/20 border-white/10 text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Phone size={18} /></span>
                                <Input defaultValue="+212 6 12 34 56 78" className="pl-10 bg-black/20 border-white/10 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Company Name</label>
                            <Input defaultValue="Atlas Logistics SARL" className="bg-black/20 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Tax ID (ICE)</label>
                            <Input defaultValue="001239928300021" className="bg-black/20 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-300">Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><MapPin size={18} /></span>
                                <Input defaultValue="128 Bd Anfa, Casablanca, Morocco" className="pl-10 bg-black/20 border-white/10 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            </Card>
        </div>
    )
}
