import { DataTypes } from 'sequelize';

const favoritesSchema = {
  tableName: 'favorites',
  options: {
    tableName: 'favorites',
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
    movieId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
  }
};

export default favoritesSchema;
