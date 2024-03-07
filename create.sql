CREATE DATABASE emailservice;

CREATE TABLE emails (
    email_id CHAR(36) PRIMARY KEY NOT NULL,
    owner_id CHAR(36) NOT NULL,
    email_from VARCHAR(60) NOT NULL,
    email_to VARCHAR(60) NOT NULL,
    subject VARCHAR(85) NOT NULL,
    text TEXT NOT NULL,
    send_date_email VARCHAR(10) NOT NULL,
    email_status CHAR(5) NOT NULL
);
