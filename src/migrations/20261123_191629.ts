import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_alt\` text NOT NULL,
  	\`version_prefix\` text DEFAULT '',
  	\`version__objectkey\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version__stored\` integer,
  	\`version__transforms\` text,
  	\`version_original_filename\` text,
  	\`version_original_url\` text,
  	\`version_original_mime_type\` text,
  	\`version_original_filesize\` numeric,
  	\`version_original_width\` numeric,
  	\`version_original_height\` numeric,
  	\`version_original_prefix\` text,
  	\`version_original__objectkey\` text,
  	\`version_original__stored\` integer,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`departments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	\`color\` text,
  	\`head_count\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`departments_updated_at_idx\` ON \`departments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`departments_created_at_idx\` ON \`departments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`departments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`departments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`departments_rels_order_idx\` ON \`departments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`departments_rels_parent_idx\` ON \`departments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`departments_rels_path_idx\` ON \`departments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`departments_rels_users_id_idx\` ON \`departments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_departments_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_description\` text,
  	\`version_icon\` text,
  	\`version_color\` text,
  	\`version_head_count\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`departments\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_departments_v_parent_idx\` ON \`_departments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_version_version_updated_at_idx\` ON \`_departments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_version_version_created_at_idx\` ON \`_departments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_created_at_idx\` ON \`_departments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_updated_at_idx\` ON \`_departments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_departments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_departments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_departments_v_rels_order_idx\` ON \`_departments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_rels_parent_idx\` ON \`_departments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_rels_path_idx\` ON \`_departments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_departments_v_rels_users_id_idx\` ON \`_departments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`regions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`display_name\` text,
  	\`timezone\` text,
  	\`flag_emoji\` text,
  	\`head_count\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`regions_updated_at_idx\` ON \`regions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regions_created_at_idx\` ON \`regions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`regions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regions_rels_order_idx\` ON \`regions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regions_rels_parent_idx\` ON \`regions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regions_rels_path_idx\` ON \`regions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regions_rels_users_id_idx\` ON \`regions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_regions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_display_name\` text,
  	\`version_timezone\` text,
  	\`version_flag_emoji\` text,
  	\`version_head_count\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_regions_v_parent_idx\` ON \`_regions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_updated_at_idx\` ON \`_regions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_created_at_idx\` ON \`_regions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_created_at_idx\` ON \`_regions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_updated_at_idx\` ON \`_regions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_regions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_regions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_order_idx\` ON \`_regions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_parent_idx\` ON \`_regions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_path_idx\` ON \`_regions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_users_id_idx\` ON \`_regions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`employees\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`department_id\` integer NOT NULL,
  	\`job_title\` text NOT NULL,
  	\`region_id\` integer NOT NULL,
  	\`email\` text,
  	\`phone\` text,
  	\`avatar_seed\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`region_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`employees_department_idx\` ON \`employees\` (\`department_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_region_idx\` ON \`employees\` (\`region_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_updated_at_idx\` ON \`employees\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`employees_created_at_idx\` ON \`employees\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`employees_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`employees_rels_order_idx\` ON \`employees_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_parent_idx\` ON \`employees_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_path_idx\` ON \`employees_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_users_id_idx\` ON \`employees_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_employees_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_first_name\` text NOT NULL,
  	\`version_last_name\` text NOT NULL,
  	\`version_department_id\` integer NOT NULL,
  	\`version_job_title\` text NOT NULL,
  	\`version_region_id\` integer NOT NULL,
  	\`version_email\` text,
  	\`version_phone\` text,
  	\`version_avatar_seed\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_department_id\`) REFERENCES \`departments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_region_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_employees_v_parent_idx\` ON \`_employees_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_version_version_department_idx\` ON \`_employees_v\` (\`version_department_id\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_version_version_region_idx\` ON \`_employees_v\` (\`version_region_id\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_version_version_updated_at_idx\` ON \`_employees_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_version_version_created_at_idx\` ON \`_employees_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_created_at_idx\` ON \`_employees_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_updated_at_idx\` ON \`_employees_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_employees_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_employees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_order_idx\` ON \`_employees_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_parent_idx\` ON \`_employees_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_path_idx\` ON \`_employees_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_users_id_idx\` ON \`_employees_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_slug\` text NOT NULL,
  	\`entity_type\` text NOT NULL,
  	\`additional_instructions\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_entity_slug_idx\` ON \`payload_llm_instructions\` (\`entity_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_updated_at_idx\` ON \`payload_llm_instructions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_created_at_idx\` ON \`payload_llm_instructions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_llm_instructions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_order_idx\` ON \`payload_llm_instructions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_parent_idx\` ON \`payload_llm_instructions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_path_idx\` ON \`payload_llm_instructions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_users_id_idx\` ON \`payload_llm_instructions_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refresh_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refreshed_at\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`type\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`metadata\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_stored\` integer;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_transforms\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`media_original_original_filename_idx\` ON \`media\` (\`original_filename\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`departments_id\` integer REFERENCES departments(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`regions_id\` integer REFERENCES regions(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`employees_id\` integer REFERENCES employees(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_departments_id_idx\` ON \`payload_locked_documents_rels\` (\`departments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_regions_id_idx\` ON \`payload_locked_documents_rels\` (\`regions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_employees_id_idx\` ON \`payload_locked_documents_rels\` (\`employees_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_rels\`;`)
  await db.run(sql`DROP TABLE \`media_rels\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_rels\`;`)
  await db.run(sql`DROP TABLE \`departments\`;`)
  await db.run(sql`DROP TABLE \`departments_rels\`;`)
  await db.run(sql`DROP TABLE \`_departments_v\`;`)
  await db.run(sql`DROP TABLE \`_departments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`regions\`;`)
  await db.run(sql`DROP TABLE \`regions_rels\`;`)
  await db.run(sql`DROP TABLE \`_regions_v\`;`)
  await db.run(sql`DROP TABLE \`_regions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`employees\`;`)
  await db.run(sql`DROP TABLE \`employees_rels\`;`)
  await db.run(sql`DROP TABLE \`_employees_v\`;`)
  await db.run(sql`DROP TABLE \`_employees_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`DROP INDEX \`media_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_stored\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_transforms\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__stored\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refresh_count\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refreshed_at\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`metadata\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`reset_password_requested_at\`;`)
}
