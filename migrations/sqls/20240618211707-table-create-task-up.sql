/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    boardId INTEGER REFERENCES board(id) ON DELETE CASCADE,
    columnId INTEGER REFERENCES columns(id) ON DELETE CASCADE,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
)