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
    let role = null

    // TEST CREDENTIALS BYPASS
    // Forces specific roles for test emails to ensure immediate access without DB edits
    if (user.email === 'sender@test.com') role = 'SENDER'
    else if (user.email === 'driver@test.com') role = 'DRIVER'
    else if (user.email === 'admin@test.com') role = 'ADMIN'

    // If not a test user, fetch from DB
    if (!role) {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single() as { data: { role: 'SENDER' | 'DRIVER' | 'ADMIN' } | null, error: any }

        if (!userError && userData) {
            role = userData.role
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
