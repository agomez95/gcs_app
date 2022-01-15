'use strict'

module.exports = (sequelize, DataTypes) => {

    const Project = sequelize.define('Project', {
        projectname: {
            type: DataTypes.STRING,      
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        updatedAt: false,
        modelName: 'projects',
    })

    //Here define the associate function for associate the model 'Project' with other tables
    Project.associate = (models) => {
        //User-Project
        //Many to One
        Project.belongsTo(models.User, {
            as: 'boss',
            foreignKey: {
                name: 'projectmanagment_id',
                allowNull:false
            }            
        })
        Project.belongsToMany(models.User, {
            through: 'user_project',
            foreignKey: {
                name: 'project',
                allowNull:false
            },
            timestamps: false
        })
    }

    return Project
}