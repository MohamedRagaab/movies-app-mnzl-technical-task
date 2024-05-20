import { Transaction } from 'sequelize';

class ODM {
  MODEL: any;

  constructor(model: any) {
    this.MODEL = model;
  }

  async findOne({ selector = {}, options = {}, transaction = null }: { selector?: any; options?: any; transaction?: Transaction | null }) {
    const data = await this.MODEL.findOne({
      where: selector,
      raw: true,
      nest: true,
      ...options,
      ...(transaction && { transaction }),
    });

    return data;
  }

  async create({ data, options = {}, transaction = null }: { data: any; options?: any; transaction?: Transaction | null }) {
    const createdRow = await this.MODEL.create(data, {
      ...options,
      ...(transaction && { transaction }),
    });

    return createdRow.get();
  }

  async update({ data, options = {}, selector = {}, transaction = null }: { data: any; options?: any; selector?: any; transaction?: Transaction | null }) {
    const [updatedCount] = await this.MODEL.update(data, {
      where: selector,
      ...options,
      ...(transaction && { transaction }),
    });

    return updatedCount;
  }

  async findAll({ selector = {}, options = {}, transaction = null }: { selector?: any; options?: any; transaction?: Transaction | null }) {
    const data = await this.MODEL.findAll({
      where: selector,
      raw: true,
      nest: true,
      ...options,
      ...(transaction && { transaction }),
    });

    return data;
  }

  async bulkCreate({ dataList, options = {}, transaction = null }: { dataList: any[]; options?: any; transaction?: Transaction | null }) {
    const data = await this.MODEL.bulkCreate(dataList, {
      ...options,
      ...(transaction && { transaction }),
    });

    return data;
  }

  async delete({ selector = {}, options = {}, transaction = null }: { selector?: any; options?: any; transaction?: Transaction | null }) {
    const data = await this.MODEL.destroy({
      where: selector,
      ...options,
      ...(transaction && { transaction }),
    });

    return data;
  }
}

export default ODM;
