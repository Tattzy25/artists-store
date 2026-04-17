CREATE TYPE "public"."artist_status" AS ENUM('online', 'offline', 'training');--> statement-breakpoint
CREATE TYPE "public"."color_mode" AS ENUM('color', 'bw');--> statement-breakpoint
CREATE TYPE "public"."generation_status" AS ENUM('pending', 'complete', 'failed');--> statement-breakpoint
CREATE TABLE "artists" (
	"version_id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"model_name" text NOT NULL,
	"artist_name" text NOT NULL,
	"status" "artist_status" DEFAULT 'online' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"trigger_word" text NOT NULL,
	"cover_image" text,
	"highlight_badges" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"workflow_ref" text,
	"generations_count" integer DEFAULT 0 NOT NULL,
	"favorites_count" integer DEFAULT 0 NOT NULL,
	"rank" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"gen_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generations" (
	"gen_id" text PRIMARY KEY NOT NULL,
	"version_id" text NOT NULL,
	"user_id" text,
	"prompt" text NOT NULL,
	"style" text,
	"color_mode" "color_mode" DEFAULT 'color' NOT NULL,
	"reference_image" text,
	"trigger_word" text NOT NULL,
	"status" "generation_status" DEFAULT 'pending' NOT NULL,
	"image_url" text,
	"error" text,
	"workflow_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_gen_id_generations_gen_id_fk" FOREIGN KEY ("gen_id") REFERENCES "public"."generations"("gen_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generations" ADD CONSTRAINT "generations_version_id_artists_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."artists"("version_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "artists_status_idx" ON "artists" USING btree ("status");--> statement-breakpoint
CREATE INDEX "artists_rank_idx" ON "artists" USING btree ("rank");--> statement-breakpoint
CREATE UNIQUE INDEX "favorites_pk" ON "favorites" USING btree ("gen_id","user_id");--> statement-breakpoint
CREATE INDEX "favorites_user_idx" ON "favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "generations_version_idx" ON "generations" USING btree ("version_id");--> statement-breakpoint
CREATE INDEX "generations_created_idx" ON "generations" USING btree ("created_at");