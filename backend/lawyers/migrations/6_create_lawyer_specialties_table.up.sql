CREATE TABLE lawyer_specialties (
  id BIGSERIAL PRIMARY KEY,
  lawyer_profile_id BIGINT NOT NULL REFERENCES lawyer_profiles(id) ON DELETE CASCADE,
  specialty_id BIGINT NOT NULL REFERENCES specialties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lawyer_profile_id, specialty_id)
);

CREATE INDEX idx_lawyer_specialties_lawyer_id ON lawyer_specialties(lawyer_profile_id);
CREATE INDEX idx_lawyer_specialties_specialty_id ON lawyer_specialties(specialty_id);
