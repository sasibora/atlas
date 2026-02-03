-- RLS Policies

-- USERS
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- WALLETS
-- Users can view their own wallet
CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);

-- TRIPS
-- Drivers can CRUD their own trips
CREATE POLICY "Drivers can manage own trips" ON public.trips FOR ALL USING (auth.uid() = driver_id);
-- Senders can search/view all scheduled trips
CREATE POLICY "Senders can view available trips" ON public.trips FOR SELECT USING (status = 'SCHEDULED' OR status = 'ACTIVE');

-- SHIPMENTS
-- Senders can CRUD their own shipments
CREATE POLICY "Senders can manage own shipments" ON public.shipments FOR ALL USING (auth.uid() = sender_id);
-- Drivers can view available shipments (simulated 'available' logic or if assigned)
CREATE POLICY "Drivers can view assigned shipments" ON public.shipments FOR SELECT USING (trip_id IN (SELECT id FROM public.trips WHERE driver_id = auth.uid()));
-- Drivers can view pending shipments to accept (broad read, restricted detail via view or app logic)
CREATE POLICY "Drivers can view pending shipments" ON public.shipments FOR SELECT USING (status = 'PENDING');

-- TRANSACTIONS
-- Users can view their own transactions via wallet
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid()));
