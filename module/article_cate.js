export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_posts_cate',
    {
      cate_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cate_title: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      created_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      modified_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
