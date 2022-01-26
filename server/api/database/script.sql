CREATE DATABASE `gcs_app`;
USE `gcs_app`;

-- USERS TABLE --

CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(11) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,    
    `password` VARCHAR(20) NOT NULL,
    `level` TINYINT(2) NOT NULL
);

ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `users`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `users`;

-- PROJECTS TABLE --

CREATE TABLE IF NOT EXISTS `projects`(    
    `id` INT(11) NOT NULL,
    `projectname` VARCHAR(150) NOT NULL,   
    `description` TEXT,
    `projectmanagment_id` INT(11),
    `created_at` timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (`projectmanagment_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `projects` 
    ADD PRIMARY KEY (`id`);
ALTER TABLE `projects`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `projects`;

-- USER-PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `user_project`(    
    `id` INT(11) NOT NULL,
    `member_id` INT(11),
    `project_id` INT(11),
    `state` VARCHAR(10),
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (`member_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `user_project`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `user_project`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `user_project`;

-- METHODOLOGYS TABLE --

 CREATE TABLE IF NOT EXISTS `methodologys`(
    `id` INT(11) NOT NULL,
    `methodname` VARCHAR(80),
    `state` VARCHAR(10)
 );

 ALTER TABLE `methodologys`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `methodologys`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `methodologys`;

-- PHASES TABLE --

CREATE TABLE IF NOT EXISTS `phases`(
    `id` INT(11) NOT NULL,
    `phasename` VARCHAR(80),
    `numberphase` INT(2),
    `method_id` INT(11) NOT NULL,
    FOREIGN KEY (`method_id`) REFERENCES `methodologys`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
 );

 ALTER TABLE `phases`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `phases`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `phases`;

-- DELIVERABLES TABLE --

CREATE TABLE IF NOT EXISTS `deliverables`(
    `id` INT(11) NOT NULL,
    `deliverablename` VARCHAR(80),
    `phase_id` INT(11) NOT NULL,
    FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
 );

 ALTER TABLE `deliverables`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `deliverables`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `deliverables`;

-- METHODOLOGY_PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `methodology_project`(
    `id` INT(11) NOT NULL,
    `method_id` INT(11),
    `project_id` INT(11),
    `state` VARCHAR(10),    
    FOREIGN KEY (`method_id`) REFERENCES `methodologys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `methodology_project`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `methodology_project`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `methodology_project`;

-- PHASES_METHOD_PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `phase_method_project`(
    `id` INT(11) NOT NULL,
    `phase_id` INT(11),
    `methodproject_id` INT(11),
    `state` VARCHAR(10),    
    FOREIGN KEY (`phase_id`) REFERENCES `phases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`methodproject_id`) REFERENCES `methodology_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `phase_method_project`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `phase_method_project`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `phase_method_project`;

