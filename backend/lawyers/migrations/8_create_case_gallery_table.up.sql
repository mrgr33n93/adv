CREATE TABLE case_gallery (
  id BIGSERIAL PRIMARY KEY,
  lawyer_profile_id BIGINT NOT NULL REFERENCES lawyer_profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,
  case_type VARCHAR(100),
  result_summary TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_case_gallery_lawyer_profile_id ON case_gallery(lawyer_profile_id);
CREATE INDEX idx_case_gallery_is_featured ON case_gallery(is_featured);
