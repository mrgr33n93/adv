CREATE TABLE specialties (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO specialties (name, description) VALUES
('Direito Civil', 'Contratos, responsabilidade civil, direitos reais'),
('Direito Penal', 'Crimes, defesa criminal, processo penal'),
('Direito Trabalhista', 'Relações de trabalho, CLT, sindicatos'),
('Direito Empresarial', 'Sociedades, contratos comerciais, recuperação judicial'),
('Direito Tributário', 'Impostos, planejamento tributário, contencioso fiscal'),
('Direito Família', 'Divórcio, guarda, pensão alimentícia'),
('Direito Imobiliário', 'Compra e venda, locação, regularização'),
('Direito Previdenciário', 'INSS, aposentadoria, benefícios'),
('Direito do Consumidor', 'Defesa do consumidor, CDC, relações de consumo'),
('Direito Ambiental', 'Licenciamento, crimes ambientais, sustentabilidade');
