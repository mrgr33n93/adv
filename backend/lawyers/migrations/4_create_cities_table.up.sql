CREATE TABLE cities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'MT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO cities (name) VALUES
('Cuiabá'),
('Várzea Grande'),
('Rondonópolis'),
('Sinop'),
('Tangará da Serra'),
('Cáceres'),
('Sorriso'),
('Lucas do Rio Verde'),
('Barra do Garças'),
('Primavera do Leste'),
('Alta Floresta'),
('Pontes e Lacerda'),
('Diamantino'),
('Nova Mutum'),
('Colíder'),
('Água Boa'),
('Juína'),
('Guarantã do Norte'),
('Peixoto de Azevedo'),
('Campo Verde');
