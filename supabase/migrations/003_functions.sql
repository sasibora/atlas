-- RPC Function to search trips by location
CREATE OR REPLACE FUNCTION search_trips(
  origin_lat FLOAT,
  origin_lng FLOAT,
  dest_lat FLOAT,
  dest_lng FLOAT,
  required_weight INTEGER
)
RETURNS SETOF public.trips
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.trips
  WHERE
    status = 'SCHEDULED'
    AND available_weight >= required_weight
    -- Simple distance check for origin (approximate 50km radius)
    AND (origin_city->>'lat')::float BETWEEN origin_lat - 0.5 AND origin_lat + 0.5
    AND (origin_city->>'lng')::float BETWEEN origin_lng - 0.5 AND origin_lng + 0.5
    -- Simple distance check for destination
    AND (destination_city->>'lat')::float BETWEEN dest_lat - 0.5 AND dest_lat + 0.5
    AND (destination_city->>'lng')::float BETWEEN dest_lng - 0.5 AND dest_lng + 0.5;
END;
$$;
