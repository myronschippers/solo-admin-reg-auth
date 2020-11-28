
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "roles" (
	"id" serial primary key,
	"label" varchar(80) not null,
	"access_level" int not null
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE,
    "password" VARCHAR (1000),
    "email" VARCHAR (800) UNIQUE NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "temp_reg_id" VARCHAR(1000),
    "role_id" INT REFERENCES "roles" NOT NULL
);

INSERT INTO "roles" ("label", "access_level")
VALUES ('admin', 0),
('manager', 3),
('peon', 6);