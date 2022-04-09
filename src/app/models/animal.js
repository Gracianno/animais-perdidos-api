import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class Animal extends Model{
  static init(sequelize){
    super.init({
      description: Sequelize.STRING,
      found: Sequelize.BOOLEAN,
      avatar_id: Sequelize.BIGINT,
      created_at: Sequelize.DATE
    },{
      sequelize,     
    }  
    );
    return this;
  }
  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    this.belongsTo(models.File, {foreignKey: 'avatar_id', as: 'avatar2'})
  }
}

export default Animal;