'use server'

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// Note: In a real app, use createClient from '@/utils/supabase/server' for proper cookie handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function processCommission(userId: string, dealAmount: number) {
    const COMMISSION_RATE = 0.10 // 10%
    const commissionAmount = dealAmount * COMMISSION_RATE

    // 1. Get Wallet
    const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (walletError || !wallet) {
        return { success: false, message: 'Wallet not found' }
    }

    // 2. Check Balance
    if (wallet.balance < commissionAmount) {
        return {
            success: false,
            message: `Insufficient balance. Required: ${commissionAmount} ${wallet.currency}. Current: ${wallet.balance}`
        }
    }

    // 3. Deduct & Transact (Ideally in a transaction block used via RPC, but simulating here)
    const newBalance = wallet.balance - commissionAmount

    // Update Wallet
    const { error: updateError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('id', wallet.id)

    if (updateError) return { success: false, message: 'Failed to update wallet' }

    // Record Transaction
    await supabase.from('transactions').insert({
        wallet_id: wallet.id,
        amount: -commissionAmount,
        type: 'COMMISSION',
        status: 'COMPLETED'
    })

    return { success: true, newBalance }
}

export async function getWallet(userId: string) {
    const { data: wallet, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single()

    // If no wallet exists, create one (lazy creation)
    if (error && error.code === 'PGRST116') {
        const { data: newWallet, error: createError } = await supabase
            .from('wallets')
            .insert({ user_id: userId, balance: 0, currency: 'MAD' })
            .select()
            .single()

        if (createError) return null
        return newWallet
    }

    return wallet
}

export async function getTransactions(walletId: string) {
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', walletId)
        .order('created_at', { ascending: false })

    if (error) return []
    return transactions
}

export async function topUpWallet(userId: string, amount: number) {
    const wallet = await getWallet(userId)
    if (!wallet) return { success: false, message: 'Wallet not found' }

    const newBalance = wallet.balance + amount

    const { error: updateError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('id', wallet.id)

    if (updateError) return { success: false, message: 'Failed to update wallet' }

    await supabase.from('transactions').insert({
        wallet_id: wallet.id,
        amount: amount,
        type: 'TOPUP',
        status: 'COMPLETED'
    })

    return { success: true, newBalance }
}
