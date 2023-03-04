export default {
    up: (queryInterface: any, DataTypes: any) =>
        queryInterface.createTable('users', {
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
            createdAt: {
                field: 'createdAt',
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                field: 'updatedAt',
                allowNull: false,
                type: DataTypes.DATE,
            },
            deletedAt: {
                field: 'deletedAt',
                allowNull: true,
                type: DataTypes.DATE,
            },
        }),

    down: (queryInterface: any) => queryInterface.dropTable('users'),
};
