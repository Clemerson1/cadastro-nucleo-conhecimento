-- Áreas
INSERT INTO area (id, nome) VALUES (1, 'Desenvolvimento Full Stack');
INSERT INTO area (id, nome) VALUES (2, 'Arquitetura de Computadores');
INSERT INTO area (id, nome) VALUES (3, 'Estruturas de Dados 1');

-- Facilitadores
INSERT INTO facilitador (id, nome) VALUES (1, 'Carlos Silva');
INSERT INTO facilitador (id, nome) VALUES (2, 'Ana Souza');
INSERT INTO facilitador (id, nome) VALUES (3, 'João Pedro');

-- Docentes
INSERT INTO docente (id, nome, email, data_ingresso, status) VALUES
 (1, 'Sofia Larissa Paiva', 'sofialarissa@faculdade.edu', '2020-02-15', 'Ativo'),
 (2, 'Willian Divino', 'willian@faculdade.edu', '2019-08-10', 'Ativo'),
 (3, 'Ana Claudia Moncao', 'anaclaudia@faculdade.edu', '2018-01-20', 'Inativo');

-- Disciplinas
INSERT INTO disciplina (id, codigo, nome, curso, matriz, ch_teorica, ch_pratica) VALUES
 (1, 'COMP101', 'Lógica de Programação', 'Sistemas de informação', '2023.1', 30, 30),
 (2, 'COMP202', 'Banco de Dados', 'Sistemas de informação', '2023.1', 40, 20),
 (3, 'COMP303', 'Sistemas Operacionais', 'Sistemas de informação', '2023.1', 50, 10);
