'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Mail, Lock, AlertCircle, Package2, Briefcase } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.refresh()
            router.push('/dashboard') // Default to dashboard, middleware/logic can redirect based on role
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
                <p className="text-gray-400 text-sm mt-1">Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email Address"
                        icon={<Mail size={18} />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-surface" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1a262b] px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className="w-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    onClick={() => {
                        // Dynamically import action to avoid build issues strictly in client component if needed, 
                        // but here we can't because it's an event handler. 
                        // We need to move the action call to a separate client component or use a form action.
                        // For simplicity, we'll use a form submission to a hidden endpoint or just call server action if creating a separate component.
                        // Actually, Next.js server actions can be imported in Client Components.
                        // Let's assume we import `loginAsDemo` at top.
                    }}
                    formAction={async () => {
                        const { loginAsDemo } = await import('@/app/actions/demo')
                        await loginAsDemo('SENDER', 'en') // Defaulting to EN for demo
                    }}
                >
                    <Package2 size={16} />
                    Demo Sender
                </Button>
                <Button
                    variant="outline"
                    className="w-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                    formAction={async () => {
                        const { loginAsDemo } = await import('@/app/actions/demo')
                        await loginAsDemo('DRIVER', 'en') // Defaulting to EN for demo
                    }}
                >
                    <Briefcase size={16} />
                    Demo Driver
                </Button>
            </div>

            <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}
