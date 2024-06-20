/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS board(
     id SERIAL PRIMARY KEY,
     boardname VARCHAR(255),
     createdat TIMESTAMPTZ DEFAULT NOW(),
     updatedat TIMESTAMPTZ DEFAULT NOW()
)