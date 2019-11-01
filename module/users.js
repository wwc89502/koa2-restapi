import moment from 'moment'

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_users',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
      },
      nicename: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nicename'
      },
      registered_time: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'registered_time',
        get() {
          return moment(this.getDataValue('registered_time')).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }
  )
}
