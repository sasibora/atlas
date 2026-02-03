import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage({ params }: { params: { locale: string } }) {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect(`/${params.locale}/login`)
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
        redirect(`/${params.locale}/login`) // Fallback
    }

    // Redirect based on role
    if (userData.role === 'DRIVER') {
        redirect(`/${params.locale}/driver/dashboard`)
    } else if (userData.role === 'SENDER') {
        redirect(`/${params.locale}/sender/dashboard`)
    } else {
        redirect(`/${params.locale}/`) // Default or Admin
    }
}
