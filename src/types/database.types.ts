export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    role: 'SENDER' | 'DRIVER' | 'ADMIN'
                    full_name: string | null
                    phone_number: string | null
                    is_verified: boolean
                    trust_score: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    role?: 'SENDER' | 'DRIVER' | 'ADMIN'
                    full_name?: string | null
                    phone_number?: string | null
                    is_verified?: boolean
                    trust_score?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    role?: 'SENDER' | 'DRIVER' | 'ADMIN'
                    full_name?: string | null
                    phone_number?: string | null
                    is_verified?: boolean
                    trust_score?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            wallets: {
                Row: {
                    id: string
                    user_id: string
                    balance: number
                    currency: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    balance?: number
                    currency?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    balance?: number
                    currency?: string
                    updated_at?: string
                }
            }
            transactions: {
                Row: {
                    id: string
                    wallet_id: string
                    amount: number
                    type: 'TOPUP' | 'COMMISSION'
                    status: 'PENDING' | 'COMPLETED' | 'FAILED'
                    created_at: string
                }
                Insert: {
                    id?: string
                    wallet_id: string
                    amount: number
                    type: 'TOPUP' | 'COMMISSION'
                    status?: 'PENDING' | 'COMPLETED' | 'FAILED'
                    created_at?: string
                }
                Update: {
                    id?: string
                    wallet_id?: string
                    amount?: number
                    type?: 'TOPUP' | 'COMMISSION'
                    status?: 'PENDING' | 'COMPLETED' | 'FAILED'
                    created_at?: string
                }
            }
            shipments: {
                Row: {
                    id: string
                    sender_id: string
                    trip_id: string | null
                    description: string | null
                    weight: number
                    item_type: 'NORMAL' | 'ELECTRONICS' | 'DOCUMENTS'
                    status: 'PENDING' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED'
                    delivery_code: string | null
                    pickup_location: Json | null
                    dropoff_location: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    sender_id: string
                    trip_id?: string | null
                    description?: string | null
                    weight: number
                    item_type?: 'NORMAL' | 'ELECTRONICS' | 'DOCUMENTS'
                    status?: 'PENDING' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED'
                    delivery_code?: string | null
                    pickup_location?: Json | null
                    dropoff_location?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    sender_id?: string
                    trip_id?: string | null
                    description?: string | null
                    weight?: number
                    item_type?: 'NORMAL' | 'ELECTRONICS' | 'DOCUMENTS'
                    status?: 'PENDING' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED'
                    delivery_code?: string | null
                    pickup_location?: Json | null
                    dropoff_location?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
