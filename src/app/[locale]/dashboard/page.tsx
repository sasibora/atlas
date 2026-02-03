import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const supabase = await createClient()
    const { locale } = await params
    const { cookies } = await import('next/headers') // Dynamic import to avoid static opt-out if not needed elsewhere

    // CHECK FOR DEMO MODE
    const cookieStore = await cookies()
    const demoRole = cookieStore.get('demo_role')?.value

    let user = null
    let role = null

    if (demoRole) {
        // Bypass Supabase Auth
        user = { id: `demo-${demoRole.toLowerCase()}-id`, email: `demo-${demoRole.toLowerCase()}@test.com` }
        role = demoRole
    } else {
        // Normal Auth Flow
        const { data } = await supabase.auth.getUser()
        user = data.user
    }

    if (!demoRole && (!user)) {
        redirect(`/${locale}/login`)
    }

    // Fetch User Role (Only if not already in Demo Mode)
    if (!role) {
        // TEST CREDENTIALS BYPASS (Legacy Pattern Matching)
        if (user?.email) {
            if (user.email.startsWith('sender')) role = 'SENDER'
            else if (user.email.startsWith('driver')) role = 'DRIVER'
            else if (user.email.startsWith('admin')) role = 'ADMIN'
        }

        // DB Fallback
        if (!role && user) {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single() as { data: { role: 'SENDER' | 'DRIVER' | 'ADMIN' } | null, error: any }

            if (!userError && userData) {
                role = userData.role
            }
        }
    }

    if (!role) {
        // Handle error (e.g., profile not setup)
        console.error('User profile not found or role missing')
        redirect(`/${locale}/login`) // Fallback
    }

    // Redirect based on role
    if (role === 'DRIVER') {
        redirect(`/${locale}/driver/dashboard`)
    } else if (role === 'SENDER') {
        redirect(`/${locale}/sender/dashboard`)
    } else {
        redirect(`/${locale}/`) // Default or Admin
    }
}
