import mongose from 'mongoose';

const NotificationSchema = new mongose.Schema({
    content:{
      type: String,
      required: true,
    },
    user_send:{
      type: Number,
      required: true
    },
    id_animal:{
      type: Number,
      required: true
    },
    read: {
      type: Boolean,
      required: true,
      default: false
    },
    name_user: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    }
  },
    {
      timestamps: true
    }   
);

export default mongose.model('Notification', NotificationSchema);