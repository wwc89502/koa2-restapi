export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_posts',
    {
      ID: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
      post_name: {
        type: DataTypes.STRING(200),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      post_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      post_modified: {
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
      post_content_filtered: {
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
