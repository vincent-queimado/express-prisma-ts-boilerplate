"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _index_1 = require("./_index");
const model = 'User';
const User = _index_1.sequelize.define(model, {
    id: {
        field: 'id',
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        field: 'email',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    name: {
        field: 'name',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        field: 'phone',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    avatar: {
        field: 'avatar',
        allowNull: true,
        defaultValue: null,
        type: sequelize_1.DataTypes.STRING,
    },
    accountName: {
        field: 'accountName',
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    accountLocationState: {
        field: 'accountLocationState',
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    accountType: {
        field: 'accountType',
        allowNull: false,
        defaultValue: 'free',
        type: sequelize_1.DataTypes.STRING,
    },
    google_signin: {
        field: 'google_signin',
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    google_given_name: {
        field: 'google_given_name',
        allowNull: true,
        defaultValue: null,
        type: sequelize_1.DataTypes.STRING,
    },
    google_family_name: {
        field: 'google_family_name',
        allowNull: true,
        defaultValue: null,
        type: sequelize_1.DataTypes.STRING,
    },
    google_locale: {
        field: 'google_locale',
        allowNull: true,
        defaultValue: null,
        type: sequelize_1.DataTypes.STRING,
    },
    google_avatar: {
        field: 'google_avatar',
        allowNull: true,
        defaultValue: null,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        field: 'password',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    signupConfirmationComplete: {
        field: 'signupConfirmationComplete',
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    signupConfirmationToken: {
        field: 'signupConfirmationToken',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    resetPasswordToken: {
        field: 'resetPasswordToken',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    enabled: {
        field: 'enabled',
        defaultValue: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    deleted: {
        field: 'deleted',
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    deletedAt: {
        field: 'deletedAt',
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
});
exports.default = User;
