CREATE DATABASE `gcs_app`;
USE `gcs_app`;

-- USERS TABLE --

CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(11) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,    
    `password` VARCHAR(20) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 1,
    `level` SMALLINT NOT NULL DEFAULT 1
);

-- status 0,1 = INACTIVO/ACTIVO - LEVEL 0,1 = ADMIN/NORMAL --

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
    `projectmanagment_id` INT(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (`projectmanagment_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `projects` 
    ADD PRIMARY KEY (`id`);
ALTER TABLE `projects`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `projects`;

-- USER-PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `users_projects`(    
    `id` INT(11) NOT NULL,
    `member_id` INT(11) NOT NULL,
    `project_id` INT(11) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 1,
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (`member_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- status 0,1 = INACTIVO/ACTIVO --

ALTER TABLE `users_projects`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `users_projects`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `users_projects`;

-- METHODOLOGYS TABLE --

 CREATE TABLE IF NOT EXISTS `methodologys`(
    `id` INT(11) NOT NULL,
    `methodname` VARCHAR(80) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 1
 );
 
-- status 0,1 = INACTIVO/ACTIVO --

 ALTER TABLE `methodologys`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `methodologys`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `methodologys`;

-- PHASES TABLE --

CREATE TABLE IF NOT EXISTS `phases`(
    `id` INT(11) NOT NULL,
    `phasename` VARCHAR(80) NOT NULL,
    `numberphase` INT(2) NOT NULL,
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
    `deliverablename` VARCHAR(80) NOT NULL,
    `phase_id` INT(11) NOT NULL,
    FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
 );

 ALTER TABLE `deliverables`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `deliverables`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `deliverables`;

-- METHODOLOGY_PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `methodologys_projects`(
    `id` INT(11) NOT NULL,
    `method_id` INT(11) NOT NULL,
    `project_id` INT(11) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 1,   
    FOREIGN KEY (`method_id`) REFERENCES `methodologys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- status 0,1 = CLOSE/OPEN --

ALTER TABLE `methodologys_projects`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `methodologys_projects`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `methodologys_projects`;

-- PHASES_METHOD_PROJECT TABLE --

CREATE TABLE IF NOT EXISTS `phases_methods_projects`(
    `id` INT(11) NOT NULL,
    `phase_id` INT(11) NOT NULL,
    `methodproject_id` INT(11) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 1,
    FOREIGN KEY (`phase_id`) REFERENCES `phases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`methodproject_id`) REFERENCES `methodologys_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- status 0,1 = CLOSE/OPEN --

ALTER TABLE `phases_methods_projects`
    ADD PRIMARY KEY (`id`);
ALTER TABLE `phases_methods_projects`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE `phases_methods_projects`;

