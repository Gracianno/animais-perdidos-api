import Sequelize from 'sequelize';
import mongose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/file';
import Animal from '../app/models/animal';

import databaseConfig from '../config/database';

const models = [User, File, Animal];

class Database{
  constructor(){
    this.init();
    this.mongo();
  }

  init(){
    this.connection =  new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongoConnection = mongose.connect(
      process.env.MONGO_URL,
      {useNewUrlParser: true, useFindAndModify: true,useUnifiedTopology: true }
    );
  }
}

export default new Database();