-- Insert sample users
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
(1, 'joao.silva@email.com', '$2b$10$example1', 'premium', true),
(2, 'maria.santos@email.com', '$2b$10$example2', 'basic', true),
(3, 'carlos.oliveira@email.com', '$2b$10$example3', 'premium', true),
(4, 'ana.costa@email.com', '$2b$10$example4', 'basic', true),
(5, 'pedro.lima@email.com', '$2b$10$example5', 'premium', true);

-- Insert sample user profiles
INSERT INTO user_profiles (user_id, first_name, last_name, phone) VALUES
(1, 'João', 'Silva', '(65) 99999-1111'),
(2, 'Maria', 'Santos', '(65) 99999-2222'),
(3, 'Carlos', 'Oliveira', '(65) 99999-3333'),
(4, 'Ana', 'Costa', '(65) 99999-4444'),
(5, 'Pedro', 'Lima', '(65) 99999-5555');

-- Insert sample lawyer profiles
INSERT INTO lawyer_profiles (id, user_id, oab_number, firm_name, bio, experience_years, city_id, address, website_url, linkedin_url, whatsapp_number, is_premium, rating, total_reviews) VALUES
(1, 1, 'MT12345', 'Silva & Associados', 'Escritório especializado em Direito Civil e Empresarial com mais de 15 anos de experiência no mercado. Atendemos clientes em todo o estado de Mato Grosso com excelência e dedicação.', 15, 1, 'Av. Getúlio Vargas, 1000 - Centro, Cuiabá - MT', 'https://silvaassociados.com.br', 'https://linkedin.com/in/joaosilva', '(65) 99999-1111', true, 4.8, 25),
(2, 2, 'MT23456', 'Advocacia Santos', 'Advogada especialista em Direito de Família e Sucessões. Atendimento humanizado e personalizado para cada cliente, buscando sempre a melhor solução para conflitos familiares.', 8, 2, 'Rua da Paz, 500 - Centro, Várzea Grande - MT', null, null, '(65) 99999-2222', false, 4.5, 12),
(3, 3, 'MT34567', 'Oliveira Advocacia Criminal', 'Especialista em Direito Penal e Processo Penal. Defesa técnica qualificada em crimes de todas as naturezas. Atendimento 24 horas para casos urgentes.', 12, 3, 'Av. Duque de Caxias, 800 - Centro, Rondonópolis - MT', 'https://oliveiraadvocacia.com.br', 'https://linkedin.com/in/carlosoliveira', '(65) 99999-3333', true, 4.9, 35),
(4, 4, 'MT45678', 'Ana Costa Advocacia', 'Advogada trabalhista com foco em direitos do trabalhador. Experiência em ações trabalhistas, acordos e negociações coletivas.', 6, 4, 'Rua das Flores, 200 - Centro, Sinop - MT', null, null, '(65) 99999-4444', false, 4.3, 8),
(5, 5, 'MT56789', 'Lima Consultoria Tributária', 'Consultoria especializada em Direito Tributário e planejamento fiscal. Atendemos empresas de todos os portes com soluções personalizadas.', 20, 1, 'Av. Rubens de Mendonça, 1500 - Bosque da Saúde, Cuiabá - MT', 'https://limaconsultoria.com.br', 'https://linkedin.com/in/pedrolima', '(65) 99999-5555', true, 4.7, 18);

-- Insert lawyer specialties relationships
INSERT INTO lawyer_specialties (lawyer_profile_id, specialty_id) VALUES
-- João Silva - Direito Civil e Empresarial
(1, 1), (1, 4),
-- Maria Santos - Direito de Família
(2, 6),
-- Carlos Oliveira - Direito Penal
(3, 2),
-- Ana Costa - Direito Trabalhista
(4, 3),
-- Pedro Lima - Direito Tributário
(5, 5);

-- Insert sample reviews
INSERT INTO reviews (lawyer_profile_id, reviewer_name, reviewer_email, rating, comment, is_approved) VALUES
(1, 'Roberto Mendes', 'roberto@email.com', 5, 'Excelente profissional! Resolveu meu caso com muita competência e agilidade.', true),
(1, 'Fernanda Alves', 'fernanda@email.com', 5, 'Muito satisfeita com o atendimento. Recomendo!', true),
(1, 'José Carlos', 'jose@email.com', 4, 'Bom advogado, preço justo.', true),
(2, 'Mariana Silva', 'mariana@email.com', 5, 'Advogada muito atenciosa e competente. Me ajudou muito no meu divórcio.', true),
(2, 'Paulo Santos', 'paulo@email.com', 4, 'Profissional dedicada, recomendo.', true),
(3, 'Ricardo Oliveira', 'ricardo@email.com', 5, 'Melhor advogado criminal da região! Me livrou de uma situação muito complicada.', true),
(3, 'Amanda Costa', 'amanda@email.com', 5, 'Excelente defesa técnica. Muito profissional.', true),
(4, 'Lucas Pereira', 'lucas@email.com', 4, 'Boa advogada trabalhista, conseguiu meus direitos.', true),
(5, 'Empresa ABC Ltda', 'contato@abc.com.br', 5, 'Consultoria tributária excepcional. Economizamos muito em impostos.', true);

-- Insert sample case gallery
INSERT INTO case_gallery (lawyer_profile_id, title, description, case_type, result_summary, is_featured) VALUES
(1, 'Recuperação Judicial Empresa XYZ', 'Processo de recuperação judicial de empresa do setor alimentício com mais de 200 funcionários.', 'Direito Empresarial', 'Recuperação aprovada com sucesso, empresa voltou a operar normalmente.', true),
(1, 'Ação de Cobrança Millionária', 'Cobrança de dívida empresarial no valor de R$ 2.5 milhões.', 'Direito Civil', 'Acordo extrajudicial no valor de R$ 2.2 milhões.', false),
(3, 'Defesa em Crime de Estelionato', 'Defesa técnica em processo criminal por estelionato qualificado.', 'Direito Penal', 'Absolvição por insuficiência de provas.', true),
(3, 'Habeas Corpus Preventivo', 'Impetração de HC preventivo em investigação de lavagem de dinheiro.', 'Direito Penal', 'HC concedido, cliente não foi preso.', true),
(5, 'Planejamento Tributário Grupo Empresarial', 'Reestruturação tributária de grupo empresarial com 15 empresas.', 'Direito Tributário', 'Redução de 35% na carga tributária anual.', true);
