CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email TEXT,
	userrole TEXT
);

CREATE TABLE user_sessions (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id INT REFERENCES users(userid)
);