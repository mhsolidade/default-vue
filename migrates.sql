create table "themes" (
  "id" int auto_increment primary key not null,
  "created_at" datetime null,
  "updated_at" datetime null,
  "name" varchar(255) null,
  "html_header" text not null,
  "html_footer" text not null
);


create table "templates" (
  "id" int auto_increment primary key not null,
  "created_at" datetime null,
  "updated_at" datetime null,
  "name" varchar(255) null,
  "html" text not null
);

ALTER TABLE channel
  ADD COLUMN parent_channel_id INT NOT NULL;
