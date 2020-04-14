export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_weather',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      data: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      location: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
