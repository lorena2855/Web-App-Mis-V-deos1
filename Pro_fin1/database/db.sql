CREATE DATABASE videos_fav;

USE videos_fav;


CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


CREATE TABLE red_social(
  id_red INT(11) NOT NULL,
  red_name VARCHAR(15) NOT NULL
);
INSERT INTO red_social (id_red, red_name)  VALUES (1,'Youtube');
INSERT INTO red_social (id_red, red_name)  VALUES (2,'Vimeo');
INSERT INTO red_social (id_red, red_name)  VALUES (3,'Metacafe');
INSERT INTO red_social (id_red, red_name)  VALUES (4, 'Daily motion');

ALTER TABLE red_social
  ADD PRIMARY KEY (id_red);


CREATE TABLE video (
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(15) NOT NULL,
  user_id INT(11),
  id_red INT(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_red FOREIGN KEY(id_red) REFERENCES red_social(id_red)

);

ALTER TABLE video
  ADD PRIMARY KEY (id);

ALTER TABLE video
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE video;

CREATE TABLE voto(
  id_video INT(11) NOT NULL,
  votos INT(11) NOT NULL,
  CONSTRAINT fk_video FOREIGN KEY(id_video) REFERENCES video(id)
);
select * from voto;

