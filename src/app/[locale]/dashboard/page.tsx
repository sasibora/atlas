import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const supabase = await createClient()
    const { locale } = await params

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect(`/${locale}/login`)
    }

    // Fetch User Role
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single() as { data: { role: 'SENDER' | 'DRIVER' | 'ADMIN' } | null, error: any }

    if (userError || !userData) {
        // Handle error (e.g., profile not setup)
        console.error('User profile error:', userError)
        redirect(`/${locale}/login`) // Fallback
    }

    // Redirect based on role
    if (userData.role === 'DRIVER') {
        redirect(`/${locale}/driver/dashboard`)
    } else if (userData.role === 'SENDER') {
        redirect(`/${locale}/sender/dashboard`)
    } else {
        redirect(`/${locale}/`) // Default or Admin
    }
}
