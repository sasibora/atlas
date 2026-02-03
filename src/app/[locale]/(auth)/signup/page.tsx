'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Mail, Lock, User, Phone, Briefcase, Package2, ArrowRight, AlertCircle } from 'lucide-react'

type Role = 'SENDER' | 'DRIVER'

export default function SignupPage() {
    const [role, setRole] = useState<Role>('SENDER')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // 1. Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                    phone: phone, // Assuming metadata for now, but should verify separately
                },
            },
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        if (authData.user) {
            // 2. Insert into public.users table (if not handled by Database Trigger)
            // Note: Ideal implementation uses a Trigger on auth.users -> public.users
            // For this MVP, we might rely on the trigger. If trigger exists, we are good.
            // If not, we manually insert:
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    role: role,
                    full_name: fullName,
                    phone_number: phone,
                    trust_score: 100,
                })

            if (profileError) {
                console.error("Profile creation failed:", profileError)
                // Even if profile fails, auth might have succeeded. 
                // For production, ensure atomicity or rollback.
            }

            router.refresh()
            router.push('/dashboard')
        }

        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-white">Create Account</h2>
                <p className="text-gray-400 text-sm mt-1">Join Atlas Connect today</p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 p-1 bg-surface/30 rounded-xl">
                <button
                    type="button"
                    onClick={() => setRole('SENDER')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'SENDER' ? 'bg-primary text-gunmetal shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Package2 size={18} />
                    Sender
                </button>
                <button
                    type="button"
                    onClick={() => setRole('DRIVER')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'DRIVER' ? 'bg-primary text-gunmetal shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Briefcase size={18} />
                    Driver
                </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Full Name"
                        icon={<User size={18} />}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email Address"
                        icon={<Mail size={18} />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="tel"
                        placeholder="Phone Number"
                        icon={<Phone size={18} />}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                    {!loading && <ArrowRight size={18} />}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-bold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    )
}
