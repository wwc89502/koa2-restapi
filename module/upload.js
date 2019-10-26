export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_upload',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING(200),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      cate: {
        type: DataTypes.STRING(200),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      created_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
