import moment from 'moment'

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_picture_cate',
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
      }
    }
  )
}
