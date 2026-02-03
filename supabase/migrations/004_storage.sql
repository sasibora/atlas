-- Create Storage Buckets
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
    INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false) ON CONFLICT (id) DO NOTHING; -- Private for verification docs
    INSERT INTO storage.buckets (id, name, public) VALUES ('shipments', 'shipments', true) ON CONFLICT (id) DO NOTHING;
END $$;

-- Storage Policies

-- AVATARS: Public Read, Auth Insert/Update
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Anyone can update their own avatar." ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- DOCUMENTS: Auth Read (Own), Auth Insert
CREATE POLICY "Users can upload verification docs." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid() = owner);
CREATE POLICY "Users can view own verification docs." ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.uid() = owner);

-- SHIPMENTS: Public Read (for drivers), Auth Insert (senders)
CREATE POLICY "Shipment images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'shipments');
CREATE POLICY "Senders can upload shipment images." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shipments' AND auth.uid() = owner);
