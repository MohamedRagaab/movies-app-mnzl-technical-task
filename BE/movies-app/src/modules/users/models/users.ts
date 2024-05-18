import { DataTypes } from 'sequelize';

const usersSchema = {
  tableName: 'users',
  options: {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  columns: {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
  }
};

export default usersSchema;
