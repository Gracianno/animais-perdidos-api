import Notification from '../schemas/Notification';
import User from '../models/User';
import File from '../models/file';
import Animal from '../models/animal';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import NotificationMail from '../jobs/NotificationMail';

class NotificationController{
  async index(req, res){
    const animal = await Animal.findOne({
      where:{id: req.params.id, found: false}
    });

    if(!animal){
      return res.status(404).json({error: 'Animal does not exist or already found'});
    }

    const notifications = await Notification
      .$where(`this.id_animal == ${req.params.id}`)
      .sort({createdAt: 'asc'}).limit(50);
      
    return res.json(notifications);
  }

  async store(req, res){
    const {mensagem, idAnimal} = req.body;

    const user = await User.findOne({
      where: {id: req.userId},
      include:[
        {
          model: File,
          as: 'avatar',
          attributes:['id', 'path', 'url']
        }
      ]
    });

    const notification = await Notification.create({
      content: mensagem,
      user_send: req.userId,
      id_animal: idAnimal,
      name_user: user.name,
      avatar: user.avatar.url,
    });
  
    if(notification){
      const notifications = await Notification
      .$where(`this.id_animal == ${idAnimal}`)
      .sort({createdAt: 'asc'}).limit(50);

      notifications.forEach(async noti => {
        const user_send = await User.findByPk(noti.user_send);
        await Queue.add(NotificationMail.key, {
          user_send, notification
       });
      });

      return res.json({notification});
    }else{
      return res.status(401).json({error: 'error processing your request'});
    }
  }
  async update(req, res){
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new: true}
      );
      
      return res.json(notification);
  }
}

export default new NotificationController();