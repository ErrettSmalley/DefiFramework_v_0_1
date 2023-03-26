/*
 Navicat Premium Data Transfer

 Source Server         : bit-mdb
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : 64.190.113.123:3306
 Source Schema         : mold

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 15/03/2023 11:11:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_config
-- ----------------------------
DROP TABLE IF EXISTS `t_config`;
CREATE TABLE `t_config` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `name` varchar(255) DEFAULT NULL,
                            `value` varchar(255) DEFAULT NULL,
                            `chain` int NOT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for t_execution_log
-- ----------------------------
DROP TABLE IF EXISTS `t_execution_log`;
CREATE TABLE `t_execution_log` (
                                   `id` bigint NOT NULL AUTO_INCREMENT,
                                   `hash` varchar(66) NOT NULL,
                                   `executor` varchar(42) NOT NULL,
                                   `timestamp` bigint NOT NULL,
                                   `rel_id` varchar(66) NOT NULL,
                                   `status` int NOT NULL DEFAULT '0',
                                   `chain` bigint NOT NULL,
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for t_position
-- ----------------------------
DROP TABLE IF EXISTS `t_position`;
CREATE TABLE `t_position` (
                              `id` varchar(66) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                              `account` varchar(66) DEFAULT NULL,
                              `collateral_token` varchar(66) DEFAULT NULL,
                              `index_token` varchar(66) DEFAULT NULL,
                              `is_long` tinyint(1) DEFAULT NULL,
                              `size` double(255,30) DEFAULT NULL,
  `collateral` double(255,30) DEFAULT NULL,
  `average_price` double(255,30) DEFAULT NULL,
  `entry_funding_rate` double(255,6) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `liq_price` double(255,30) DEFAULT NULL,
  `create_timestamp` bigint DEFAULT NULL,
  `update_timestamp` bigint DEFAULT NULL,
  `chain` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for t_robot
-- ----------------------------
DROP TABLE IF EXISTS `t_robot`;
CREATE TABLE `t_robot` (
                           `id` bigint NOT NULL AUTO_INCREMENT,
                           `address` varchar(42) NOT NULL,
                           `index` int NOT NULL,
                           `status` int NOT NULL DEFAULT '0',
                           `chain` int NOT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
