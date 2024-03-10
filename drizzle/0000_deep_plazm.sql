CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`content` varchar(100000) NOT NULL,
	`author_id` int,
	`date` timestamp NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`password` varchar(100) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;