import moment from 'moment'

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'dblog_projects',
    {
      id: {
        type: DataTypes.BIGINT(10),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      name: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      desc: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        autoIncrement: false
      },
      technology: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      viewAddress: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      codeAddress: {
        type: DataTypes.TEXT('long'),
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      },
      complete_time: {
        type: DataTypes.DATE,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false,
        get () {
          return moment(this.getDataValue('complete_time')).format('YYYY-MM-DD')
        }
      },
      isShow: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        autoIncrement: false
      }
    }
  )
}
