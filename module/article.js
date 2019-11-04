import moment from 'moment'

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_posts',
    {
      cid: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      status: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      title: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      content: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
