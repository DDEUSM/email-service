CREATE TABLE "contexts" (
  "id" char(36) PRIMARY KEY,
  "project_id" char(36),
  "email_from" VARCHAR(150),
  "email_template_id" CHAR(36),
  "title" VARCHAR(70),
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "emailtemplates" (
  "id" char(36) PRIMARY KEY,
  "project_id" char(36),
  "title" VARCHAR(60),
  "subject" VARCHAR(150),
  "html" text,
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "users" (
  "id" char(36) PRIMARY KEY,
  "team_id" char(36),
  "role_id" char(36),
  "first_name" VARCHAR(100),
  "last_name" VARCHAR(100),
  "email" VARCHAR(100) UNIQUE,
  "password_hash" VARCHAR(50),
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "projects" (
  "id" CHAR(36) PRIMARY KEY,
  "api_key_hash" CHAR(36),
  "client_host" VARCHAR(50),
  "owner_id" CHAR(36),
  "title" VARCHAR(75),
  "public" BOOLEAN,
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "registeredemails" (
  "id" CHAR(36) PRIMARY KEY,
  "project_id" CHAR(36),
  "email" VARCHAR(100)
);

CREATE TABLE "teams" (
  "id" char(36) PRIMARY KEY,
  "owner_id" char(36),
  "title" VARCHAR(70)
);

CREATE TABLE "roles" (
  "id" char(36) PRIMARY KEY,
  "title" VARCHAR(60)
);

CREATE TABLE "recipients" (
  "id" char(36) PRIMARY KEY,
  "repository_id" char(36),
  "first_name" VARCHAR(100),
  "last_name" VARCHAR(100),
  "email" VARCHAR(100),
  "status" BOOLEAN,
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "repositories" (
  "id" char(36) PRIMARY KEY,
  "project_id" char(36),
  "title" VARCHAR(70),
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "campaign" (
  "id" char(36) PRIMARY KEY,
  "project_id" char(36),
  "title" VARCHAR(70),
  "start_date" INTEGER,
  "send_delay" FLOAT,
  "filters" TEXT[],
  "created_at" DATE DEFAULT NOW()
);

CREATE TABLE "campaigntemplates" (
  "id" char(36) PRIMARY KEY,
  "campaign_id" char(36),
  "email_template_id" char(36)
);

CREATE TABLE "campaignrepositories" (
  "id" char(36) PRIMARY KEY,
  "campaign_id" char(36),
  "repository_id" char(36)
);

ALTER TABLE "projects" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "contexts" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "campaign" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "registeredemails" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "teams" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "contexts" ADD FOREIGN KEY ("email_template_id") REFERENCES "emailtemplates" ("id");

ALTER TABLE "emailtemplates" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "repositories" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "recipients" ADD FOREIGN KEY ("repository_id") REFERENCES "repositories" ("id");

ALTER TABLE "campaigntemplates" ADD FOREIGN KEY ("email_template_id") REFERENCES "emailtemplates" ("id");

ALTER TABLE "campaigntemplates" ADD FOREIGN KEY ("campaign_id") REFERENCES "campaign" ("id");

ALTER TABLE "campaignrepositories" ADD FOREIGN KEY ("repository_id") REFERENCES "repositories" ("id");

ALTER TABLE "campaignrepositories" ADD FOREIGN KEY ("campaign_id") REFERENCES "campaign" ("id");


INSERT INTO roles (id, title) 
VALUES (
  'e5f9e696-4059-467d-8e96-4c3f91ec1258',
  'test role'
);

INSERT INTO users (id, role_id, first_name, last_name, email, password_hash) 
VALUES (
  '303a391e-d532-4eed-a0e2-3309c97f4d21',
  'e5f9e696-4059-467d-8e96-4c3f91ec1258',
  'David',
  'de Deus',
  'david@live.com',
  '2rggt4tthhlkkkkj'
);

INSERT INTO teams (id, owner_id, title) 
VALUES (
  '3e5fed51-77e0-4ca9-a05b-9c90492ca5eb',
  '303a391e-d532-4eed-a0e2-3309c97f4d21',
  'team title'
);

UPDATE users 
SET team_id = '3e5fed51-77e0-4ca9-a05b-9c90492ca5eb'
WHERE id = '303a391e-d532-4eed-a0e2-3309c97f4d21';

INSERT INTO projects (id, api_key_hash, client_host, owner_id, title, public) VALUES (
  '7e5fed81-77e0-4ca9-a05b-9c90492ca5eb',
  'b0b77de101e00?4d4e%8652%b6527fe4b0d9',
  'http://localhost:3440',
  '303a391e-d532-4eed-a0e2-3309c97f4d21',
  'project 1',
  TRUE
);

INSERT INTO emailtemplates (id, project_id, title, subject, html) 
VALUES (
  '307a391e-d532-4eed-a0e2-3309c97f4111',
  '7e5fed81-77e0-4ca9-a05b-9c90492ca5eb',
  'email template test',
  'first test',
  '<h1 style="color: red;">first test</h1>'
);