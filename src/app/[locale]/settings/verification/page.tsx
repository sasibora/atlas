import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Clock, ShieldCheck, Upload, FileText, Image as ImageIcon, Trash2, Info } from "lucide-react"

export default function VerificationPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Identity Verification</h1>
                <p className="text-gray-400 mt-1">Complete the steps below to verify your account.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Timeline */}
                <div className="space-y-6">
                    <Card className="p-6 bg-[#1A262B] border-white/5">
                        <h2 className="font-bold text-white mb-4">Current Status</h2>
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="text-orange-500" size={24} />
                            <span className="text-xl font-bold text-orange-500">Pending Review</span>
                        </div>
                        <p className="text-sm text-gray-400">Your documents are under review. This usually takes 24-48 hours.</p>
                    </Card>

                    <Card className="p-6 bg-[#1A262B] border-white/5">
                        <h2 className="font-bold text-white mb-6">Progress</h2>
                        <div className="space-y-8 pl-2">
                            {/* Step 1 */}
                            <div className="relative pl-8 border-l border-primary/30">
                                <span className="absolute -left-[17px] top-0 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/50">
                                    <Check size={14} strokeWidth={3} />
                                </span>
                                <p className="text-sm font-bold text-white">Account Created</p>
                                <p className="text-xs text-gray-500">Oct 24, 10:30 AM</p>
                            </div>
                            {/* Step 2 */}
                            <div className="relative pl-8 border-l border-primary/30">
                                <span className="absolute -left-[17px] top-0 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/50">
                                    <Check size={14} strokeWidth={3} />
                                </span>
                                <p className="text-sm font-bold text-white">Email Confirmed</p>
                                <p className="text-xs text-gray-500">Oct 24, 10:35 AM</p>
                            </div>
                            {/* Step 3 */}
                            <div className="relative pl-8 border-l border-white/10">
                                <span className="absolute -left-[17px] top-0 size-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/50">
                                    <Clock size={16} />
                                </span>
                                <p className="text-sm font-bold text-white">Documents Submitted</p>
                                <p className="text-xs text-orange-400">Pending Review</p>
                            </div>
                            {/* Step 4 */}
                            <div className="relative pl-8">
                                <span className="absolute -left-[17px] top-0 size-8 rounded-full bg-slate-800 text-gray-500 flex items-center justify-center border border-white/5">
                                    <ShieldCheck size={16} />
                                </span>
                                <p className="text-sm font-medium text-gray-500">Verified</p>
                                <p className="text-xs text-gray-600">Estimated: Oct 26</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Upload */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 bg-[#1A262B] border-white/5">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">Document Upload</h2>
                                <p className="text-sm text-gray-400 mt-1">Please upload a valid government ID.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Box 1 */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">National ID (Front & Back)</label>
                                <div className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                    <Upload size={32} className="text-primary mb-3" />
                                    <p className="text-sm text-gray-400 mb-1"><span className="text-primary font-bold">Click to upload</span></p>
                                    <p className="text-xs text-gray-600">ID Card, Passport or License</p>
                                </div>
                            </div>
                            {/* Box 2 */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">Driver License</label>
                                <div className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                    <Upload size={32} className="text-primary mb-3" />
                                    <p className="text-sm text-gray-400 mb-1"><span className="text-primary font-bold">Click to upload</span></p>
                                    <p className="text-xs text-gray-600">Valid Class C/E License</p>
                                </div>
                            </div>
                        </div>

                        {/* File List */}
                        <div className="mt-8">
                            <h3 className="text-sm font-bold text-white mb-3">Uploaded Documents</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">scan_id_front.pdf</p>
                                            <p className="text-xs text-gray-500">2.4 MB • Uploaded just now</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                            <ImageIcon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">license_back.jpg</p>
                                            <p className="text-xs text-gray-500">1.8 MB • Uploaded 2 mins ago</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-3">
                            <Button variant="ghost">Cancel</Button>
                            <Button>Submit for Verification</Button>
                        </div>
                    </Card>

                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 flex gap-4">
                        <div className="bg-primary/20 text-primary p-2 rounded-lg h-fit">
                            <Info size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Why do we need this?</h4>
                            <p className="text-sm text-gray-400">Regulatory compliance requires us to verify the identity of all logistics partners. Your data is encrypted and stored securely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
