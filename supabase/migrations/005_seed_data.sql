-- Seed Data for Atlas Connect

-- Note: We cannot easily seed auth.users from SQL without admin privileges or knowing encrypted passwords.
-- However, we can Insert mock data for public tables *assuming* UUIDs exist or just for display if we relaxed constraints (which we shouldn't).
-- Strategy: We will create logic to insert entries linked to a 'Demo User' if we were running a seed script.
-- Since this is just SQL, we will provide sample INSERT statements that the user can run *after* they sign up in the app, or we update the app to use these.

-- Ideally, for a "Seed", we want to populate the MARKETPLACE with Trips that active users can see.
-- We can create some "Ghost" driver profiles for the marketplace listings.

DO $$
DECLARE
    -- Generate some random UUIDs for ghost drivers
    driver1_id UUID := gen_random_uuid();
    driver2_id UUID := gen_random_uuid();
BEGIN
    -- 1. Create Ghost Drivers in public.users (They won't be able to login, but they exist for data relationships)
    INSERT INTO public.users (id, role, full_name, phone_number, is_verified, trust_score)
    VALUES 
    (driver1_id, 'DRIVER', 'Ralph Edwards', '+212 600 000 001', true, 98),
    (driver2_id, 'DRIVER', 'Bessie Cooper', '+212 600 000 002', true, 95)
    ON CONFLICT (id) DO NOTHING;

    -- 2. Create Trips for these drivers (Visible in Marketplace)
    INSERT INTO public.trips (driver_id, origin_city, destination_city, departure_date, available_weight, status)
    VALUES
    (driver1_id, '{"name": "Casablanca", "lat": 33.5731, "lng": -7.5898}', '{"name": "Paris", "lat": 48.8566, "lng": 2.3522}', NOW() + INTERVAL '2 days', 500, 'SCHEDULED'),
    (driver1_id, '{"name": "Tangier", "lat": 35.7595, "lng": -5.8340}', '{"name": "Madrid", "lat": 40.4168, "lng": -3.7038}', NOW() + INTERVAL '5 days', 1200, 'SCHEDULED'),
    (driver2_id, '{"name": "Agadir", "lat": 30.4278, "lng": -9.5981}', '{"name": "London", "lat": 51.5074, "lng": -0.1278}', NOW() + INTERVAL '1 week', 800, 'SCHEDULED');

    -- 3. Create active shipments (if needed) for demo
    -- (Skipping for now as shipments are usually user-specific)

END $$;
