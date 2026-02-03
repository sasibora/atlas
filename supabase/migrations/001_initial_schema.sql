-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create Enums
CREATE TYPE user_role AS ENUM ('SENDER', 'DRIVER', 'ADMIN');
CREATE TYPE trip_status AS ENUM ('SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE shipment_item_type AS ENUM ('NORMAL', 'ELECTRONICS', 'DOCUMENTS');
CREATE TYPE shipment_status AS ENUM ('PENDING', 'ACCEPTED', 'IN_TRANSIT', 'DELIVERED');
CREATE TYPE transaction_type AS ENUM ('TOPUP', 'COMMISSION');
CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- Create Tables

-- Public Users (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'SENDER',
  full_name TEXT,
  phone_number TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  trust_score INTEGER DEFAULT 100 CHECK (trust_score BETWEEN 0 AND 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  currency TEXT DEFAULT 'MAD',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Trips
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  origin_city JSONB NOT NULL, -- {name, lat, lng}
  destination_city JSONB NOT NULL, -- {name, lat, lng}
  departure_date TIMESTAMP WITH TIME ZONE NOT NULL,
  available_weight INTEGER NOT NULL, -- in kg
  status trip_status DEFAULT 'SCHEDULED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipments
CREATE TABLE public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL, -- Nullable until accepted
  description TEXT,
  weight INTEGER NOT NULL, -- in kg
  item_type shipment_item_type DEFAULT 'NORMAL',
  status shipment_status DEFAULT 'PENDING',
  delivery_code TEXT, -- Encrypted or hashed in real app, stored as text here
  pickup_location JSONB, -- {name, lat, lng}
  dropoff_location JSONB, -- {name, lat, lng}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type transaction_type NOT NULL,
  status transaction_status DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
