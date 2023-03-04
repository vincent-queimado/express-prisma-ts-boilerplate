import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from './_index';

const model = 'User';

interface UserAttributes {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    email: string;
    accountName: string;
    accountLocationState: string;
    accountType: string;
    google_signin: boolean;
    google_given_name: string;
    google_family_name: string;
    google_locale: string;
    google_avatar: string;
    password: string;
    signupConfirmationComplete: boolean;
    signupConfirmationToken: string;
    resetPasswordToken: string;
    enabled: boolean;
    deleted: boolean;
    deletedAt: Date;
}

/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(model, {
    id: {
        field: 'id',
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    name: {
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        field: 'phone',
        allowNull: false,
        type: DataTypes.STRING,
    },
    avatar: {
        field: 'avatar',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    accountName: {
        field: 'accountName',
        allowNull: true,
        type: DataTypes.STRING,
    },
    accountLocationState: {
        field: 'accountLocationState',
        allowNull: true,
        type: DataTypes.STRING,
    },
    accountType: {
        field: 'accountType',
        allowNull: false,
        defaultValue: 'free',
        type: DataTypes.STRING,
    },
    google_signin: {
        field: 'google_signin',
        defaultValue: false,
        type: DataTypes.BOOLEAN,
    },
    google_given_name: {
        field: 'google_given_name',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    google_family_name: {
        field: 'google_family_name',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    google_locale: {
        field: 'google_locale',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    google_avatar: {
        field: 'google_avatar',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
    },
    password: {
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING,
    },
    signupConfirmationComplete: {
        field: 'signupConfirmationComplete',
        defaultValue: false,
        type: DataTypes.BOOLEAN,
    },
    signupConfirmationToken: {
        field: 'signupConfirmationToken',
        allowNull: false,
        type: DataTypes.STRING,
    },
    resetPasswordToken: {
        field: 'resetPasswordToken',
        allowNull: false,
        type: DataTypes.STRING,
    },
    enabled: {
        field: 'enabled',
        defaultValue: true,
        type: DataTypes.BOOLEAN,
    },
    deleted: {
        field: 'deleted',
        defaultValue: false,
        type: DataTypes.BOOLEAN,
    },
    deletedAt: {
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    },
});

export default User;
