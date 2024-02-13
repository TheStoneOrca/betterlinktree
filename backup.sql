CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email TEXT,
	userrole TEXT
);

CREATE TABLE linktreepages(
	pageid SERIAL PRIMARY KEY,
	pagetitle TEXT,
	pagetextcontent TEXT,
	pageimage TEXT,
	pagecreator INT REFERENCES users(userid)
);

CREATE TABLE links(
	linkid SERIAL PRIMARY KEY,
	linkname TEXT,
	linkhref TEXT,
	linkcolor TEXT,
	linkicon TEXT,
	linkbuttonpage INT REFERENCES linktreepages(pageid)
);

ALTER TABLE links ADD COLUMN textcolor TEXT;