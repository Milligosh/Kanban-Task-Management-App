/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS columns(
    id SERIAL PRIMARY KEY,
    boardId INTEGER REFERENCES board(id) ON DELETE CASCADE,
    columnName VARCHAR(255),
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
)