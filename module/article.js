export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_posts',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cate_id: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      post_status: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      post_title: {
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
      },
      post_content: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      comment_status: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      comment_count: {
        type: DataTypes.BIGINT(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
