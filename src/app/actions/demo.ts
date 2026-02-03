'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAsDemo(role: 'SENDER' | 'DRIVER', locale: string) {
    // Set a cookie to indicate demo mode
    const cookieStore = await cookies()
    cookieStore.set('demo_role', role, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 day
    })

    // Redirect to the dashboard
    redirect(`/${locale}/dashboard`)
}

export async function logoutDemo(locale: string) {
    const cookieStore = await cookies()
    cookieStore.delete('demo_role')
    redirect(`/${locale}/login`)
}
