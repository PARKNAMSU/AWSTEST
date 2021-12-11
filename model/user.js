const { Sequelize, DataTypes, Model } = require('sequelize');
DATABASE_HOST="database-ns.cuopzade2cgu.ap-northeast-2.rds.amazonaws.com";
DATABASE_USER="admin";
DATABASE_PASSWORD="slek4173";
DATABASE_NAME="test";

let sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    port:'13306'
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