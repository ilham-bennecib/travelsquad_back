-- SQLBook: Code

-- Deploy catalyse:init to pg

BEGIN;

CREATE TABLE
    IF NOT EXISTS "user" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "firstName" VARCHAR(64) NOT NULL,
        "lastName" VARCHAR(64) NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "age" TEXT NOT NULL,
        "image" TEXT,
        "password" TEXT NOT NULL UNIQUE,
        "content" TEXT,
        "country_of_origin" TEXT NOT NULL,
        "phone" TEXT UNIQUE,
        "sex" TEXT NOT NULL,
        "spoken_language" VARCHAR(64),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    IF NOT EXISTS "theme" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    IF NOT EXISTS "group" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL,
        "start" TIMESTAMPTZ,
        "end" TIMESTAMPTZ,
        "language" VARCHAR(64) NOT NULL,
        "content" TEXT NOT NULL,
        "max_members" INT NOT NULL,
        "country" VARCHAR(64) NOT NULL,
        "city" VARCHAR(64) NOT NULL,
        "theme_id" INTEGER REFERENCES "theme"("id") NOT NULL DEFAULT 1,
        "creator_id" INTEGER REFERENCES "user"("id") NOT NULL DEFAULT 1,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    IF NOT EXISTS "experience" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "year" INT NOT NULL,
        "country" VARCHAR(64) NOT NULL,
        "title" VARCHAR(64) NOT NULL,
        "content" TEXT NOT NULL,
        "user_id" INTEGER REFERENCES "user"("id") NOT NULL DEFAULT 1,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    IF NOT EXISTS "user_group" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "user_id" INTEGER REFERENCES "user"("id") NOT NULL DEFAULT 1,
        "group_id" INTEGER REFERENCES "group"("id") NOT NULL DEFAULT 1,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

COMMIT;