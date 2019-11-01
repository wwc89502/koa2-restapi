import moment from 'moment'

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_picture',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cate_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      show_status: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      pic_title: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      upload_url: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      created_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false,
        get() {
          return moment(this.getDataValue('created_date')).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      modified_date: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false,
        get() {
          return moment(this.getDataValue('modified_date')).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      pic_content: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      comment_status: {
        type: DataTypes.BOOLEAN,
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
