'use server'

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { processCommission } from './wallet'

// Note: In a real app, use createClient from '@/utils/supabase/server'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function bookAndCompleteShipment(
    senderId: string,
    driverId: string,
    origin: string,
    destination: string,
    price: number
) {
    // 1. Create Shipment Record
    const { data: shipment, error: shipmentError } = await supabase
        .from('shipments')
        .insert({
            sender_id: senderId,
            description: `Shipment from ${origin} to ${destination}`,
            weight: 10, // Default for demo
            item_type: 'NORMAL',
            status: 'DELIVERED', // Simulate immediate delivery for demo
            pickup_location: { address: origin },
            dropoff_location: { address: destination },
        } as any)
        .select()
        .single()

    if (shipmentError) {
        console.error("Shipment Creation Error:", shipmentError)
        return { success: false, message: 'Failed to create shipment' }
    }

    // 2. Process Commission (Deduct from Driver's Wallet)
    // We assume the Driver received "Cash on Delivery" from the Sender,
    // so the Platform now takes its cut from the Driver's prepaid wallet.
    const commissionResult = await processCommission(driverId, price)

    if (!commissionResult.success) {
        return {
            success: true,
            message: 'Shipment created but Commission Failed: ' + commissionResult.message,
            warning: true
        }
    }

    return { success: true, newBalance: commissionResult.newBalance }
}
