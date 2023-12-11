module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
        pseudo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true, // Ici une validation de données
            },
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i, // Ici une contrainte
        },
    })
}
