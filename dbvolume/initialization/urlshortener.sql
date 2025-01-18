CREATE DATABASE URL;
USE URL;
CREATE TABLE URL (
    SHORTURL VARCHAR(255) PRIMARY KEY,
    LONGURL VARCHAR(255),
    CREATEDATE DATETIME,
    UPDATEDATE DATETIME,
    ACCESSCOUNT INT
);

ALTER USER 'urlshortener'@'%' IDENTIFIED WITH mysql_native_password BY 'customurl';
grant all privileges on URL.URL to 'urlshortener'@'%';


INSERT INTO URL
VALUES ('fb', 'https://www.facebook.com', NOW(), NOW(), 0);

INSERT INTO URL
VALUES ('google', 'https://www.google.com', NOW(), NOW(), 0);