import { Sequelize, ModelDefined } from 'sequelize';
import logger from './logger.js';

interface TableDefinition {
  [tableName: string]: ModelDefined<any, any>;
}

interface RelationDefinition {
  sourceTable: string;
  targetTable: string;
  type: string;
  options?: any;
}

export default class SQLDatabase {
  private config: any;
  private sequelize: Sequelize;
  private tableDefinitions: TableDefinition;
  private tableRelationsDefinitions: RelationDefinition[];
  private RELATION_TYPES = {
    HAS_ONE: 'hasOne',
    HAS_MANY: 'hasMany',
    BELONGS_TO: 'belongsTo',
    BELONGS_TO_MANY: 'belongsToMany'
  };

  constructor(config: any) {
    this.config = config;
    logger.info(`Initiating sequelize instance for database: ${config.database}`);
    this.sequelize = new Sequelize(
      config.database,
      config.user,
      config.password,
      {
        dialect: 'postgres',
        ...config
      },
    );
    this.tableDefinitions = {};
    this.tableRelationsDefinitions = [];
  }

  defineTable(tableName: string, columns: any, options: any) {
    this.tableDefinitions[tableName] = this.sequelize.define(
      tableName,
      columns,
      options
    );
    return this.tableDefinitions[tableName];
  }

  defineRelation(sourceTable: string, targetTable: string, type: string, options: any = {}) {
    this.tableRelationsDefinitions.push({
      sourceTable,
      targetTable,
      type,
      options
    });
  }

  async initiateConnection() {
    try {
      logger.info(`[SQLDatabase] Sequelize connection to ${this.config.database} establishing`);
      await this.sequelize.authenticate();
      logger.info(`[SQLDatabase] Sequelize connection to ${this.config.database} has been established successfully.`);
    } catch (error: any) {
      logger.error(`[SQLDatabase] Sequelize authentication error database: ${this.config.database} error: ${error.message}`);
      throw error;
    }
  }

  async syncTables() {
    try {
      logger.info(`[SQLDatabase][Syncing] database ${this.config.database} started`);
      const definitions = Object.values(this.tableDefinitions);
      await Promise.all(
        definitions.map(async tableDefinition => {
          try {
            await tableDefinition.sync();
          } catch (error: any) {
            logger.error(`[SQLDatabase][Syncing] database ${this.config.database} table: ${tableDefinition.tableName} failed with ${error.message}`);
          }
        })
      );

      logger.info(`[SQLDatabase][Syncing] database ${this.config.database} has been done successfully.`);
    } catch (error: any) {
      logger.error(`[SQLDatabase][Syncing] database ${this.config.database} failed with ${error.message}`);
    }
  }

  async closeConnection() {
    try {
      logger.info(`[SQLDatabase] Sequelize connection to ${this.config.database} closing`);
      await this.sequelize.close();
      logger.info(`[SQLDatabase] Sequelize connection to ${this.config.database} has been closed successfully.`);
    } catch (error: any) {
      logger.error(`[SQLDatabase] Sequelize closing connection error database: ${this.config.database} error: ${error.message}`);
      throw error;
    }
  }

  async createRelations() {
    this.tableRelationsDefinitions.forEach(relationDefinition => {
      const { sourceTable, targetTable, type, options } = relationDefinition;

      try {
        const sourceModel = this.tableDefinitions[sourceTable];
        const targetModel = this.tableDefinitions[targetTable];

        if (!sourceModel || !targetModel) {
          throw new Error(`Failed to define relation ${sourceTable} -> ${targetTable}`);
        }

        switch (type) {
          case this.RELATION_TYPES.HAS_ONE: {
            sourceModel.hasOne(targetModel, options);
            break;
          }
          case this.RELATION_TYPES.HAS_MANY: {
            sourceModel.hasMany(targetModel, options);
            break;
          }
          case this.RELATION_TYPES.BELONGS_TO: {
            sourceModel.belongsTo(targetModel, options);
            break;
          }
          case this.RELATION_TYPES.BELONGS_TO_MANY: {
            sourceModel.belongsToMany(targetModel, options);
            break;
          }
          default:
            throw new Error(`Invalid relation type: ${type}`);
        }
      } catch (error: any) {
        logger.error(`[SQLDatabase] Creating relation between ${sourceTable} & ${targetTable} failed with ${error.message}`);
      }
    });
  }
}
