CREATE TABLE lawyer_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  oab_number VARCHAR(20) UNIQUE NOT NULL,
  firm_name VARCHAR(200),
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  city_id BIGINT REFERENCES cities(id),
  address TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  whatsapp_number VARCHAR(20),
  is_premium BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  profile_image_url TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_lawyer_profiles_user_id ON lawyer_profiles(user_id);
CREATE INDEX idx_lawyer_profiles_city_id ON lawyer_profiles(city_id);
CREATE INDEX idx_lawyer_profiles_is_premium ON lawyer_profiles(is_premium);
CREATE INDEX idx_lawyer_profiles_rating ON lawyer_profiles(rating);
