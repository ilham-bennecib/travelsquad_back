-- Revert voyage:init from pg

BEGIN;

DROP TABLE
    IF EXISTS "user",
    "theme",
    "group",
    "experience",
    "user_group";

COMMIT;