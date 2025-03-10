CREATE TABLE IF NOT EXISTS "choredom_task" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "choredom_task_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"point_value" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "choredom_task" ADD CONSTRAINT "choredom_task_created_by_choredom_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."choredom_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
