'use strict'

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'users',
    })

    //Here define the associate function for associate the model 'User' with other tables
    User.associate = (models) => {
        //User-Project
        //One to Many
        User.hasMany(models.Project, {
            as: 'project',
            foreignKey: {
                name: 'projectmanagment_id',
                allowNull:false
            }            
        })
        //Many to Many
        User.belongsToMany(models.Project, {
            through: 'user_project',
            foreignKey: {
                name: 'member_id',
                allowNull:false
            },
            timestamps: false
        })
    }

    return User
}