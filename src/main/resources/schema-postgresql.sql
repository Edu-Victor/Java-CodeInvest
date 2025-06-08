CREATE TABLE IF NOT EXISTS saldo (
    id SERIAL PRIMARY KEY,
    valor_total DECIMAL(10, 2) DEFAULT 0.00
);

INSERT INTO saldo (id, valor_total) VALUES (1, 0.00)
ON CONFLICT (id) DO NOTHING;


CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(96) UNIQUE NOT NULL,
    email VARCHAR(96) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    valor FLOAT,
    dividend FLOAT,
    rendimento FLOAT,
    segmento VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ativos (
    id SERIAL PRIMARY KEY,
    ativo VARCHAR(50),
    valorunitario FLOAT,
    quantidade INT,
    datacompra DATE,
    valortotal FLOAT
);



