import User from '../models/User';
import Animal from '../models/animal';
import File from '../models/file'

class AnimalController{
  async index(req, res){
    const animals = await Animal.findAll({
      where: {found: false},
      attributes: ['id', 'description', 'found', 'created_at'],
      order:['created_at'],
      include:[{
        model: User,
        as: 'user',
        attributes:['id', 'name'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url']
          }
        ]
      },

      
        {
          model: File,
          as: 'avatar2',
          attributes: ['id', 'path', 'url']
        }
      
    ]
    
    });

    return res.json(animals);
  }

  async getPostsForUser(req, res){
    const animals = await Animal.findAll({
      where: {found: false, user_id: req.userId},
      attributes: ['id', 'description', 'found', 'created_at'],
      order:['created_at'],
      include:[{
        model: User,
        as: 'user',
        attributes:['id', 'name'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url']
          }
        ]
      },
        {
          model: File,
          as: 'avatar2',
          attributes: ['id', 'path', 'url']
        }
      
    ]
    
    });

    return res.json(animals);
  }

  async store(req, res){
    const {description, avatar_id} = req.body;

    const animal = await Animal.create({
      user_id: req.userId,
      found: false,
      description,
      avatar_id
    });

    return res.json(animal);
  }

  async delete(req, res){
    
  }
  async update(req, res) {
      const {id} = req.params;

      const animal_by_id = await Animal.findByPk(id);

      if(!animal_by_id){
        return res.status(404).json({error: 'Animal not found.'});
      }

      const animal = await Animal.findOne({
        where:{user_id: req.userId, id: id}
      });

      if(!animal){
        return res.status(401).json({error: 'you cannot edit this data.'});
      }

      await animal.update({found: true});

      return res.status(200).json();
   }
}

export default new AnimalController();