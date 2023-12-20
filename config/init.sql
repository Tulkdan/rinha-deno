CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS PESSOAS (
    id VARCHAR(36),
    apelido VARCHAR(32) CONSTRAINT ID_PK PRIMARY KEY,
    nome VARCHAR(100),
    nascimento CHAR(10),
    stack VARCHAR(1024),
    busca_trgm TEXT GENERATED ALWAYS AS (
        LOWER(NOME || APELIDO || STACK)
    ) STORED
);

CREATE INDEX CONCURRENTLY IF NOT EXISTS IDX_PESSOAS_BUSCA_TGRM ON PESSOAS USING GIST (busca_trgm GIST_TRGM_OPS(SIGLEN=64));