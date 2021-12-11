const { Sequelize, DataTypes, Model } = require('sequelize');

let sequelize = new Sequelize('test', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type:DataTypes.STRING,
        defaultValue: ''
    },
    lastName: {
        type:DataTypes.STRING,
        defaultValue: ''
    },
    regDate: {
        type: DataTypes.DATE,
        defaultValue:Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
});

const setup = () => {
    try {
        //User.sync()를 통해 데이터베이스에 User에서 정의한 테이블을 생성
        User.sync({ force: true });
    }catch(err) {
        console.log(err);
    }
}

setup();

module.exports = {
    User
};