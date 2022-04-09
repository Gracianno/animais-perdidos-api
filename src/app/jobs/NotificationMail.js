import Mail from '../../lib/Mail';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

class NotificationMail{
  get key(){
    return 'NotificationMail';
  }

  async handle({data}){
    const { user_send, notification} = data;

    await Mail.sendMail({
      to: `${user_send.name} <${user_send.email}>`,
      subject: ' Lost Extinction Animals - Novo Contato',
      template: 'contact',
      context:{
        user_receiver: user_send.name,
        user_send: notification.name_user,
        content: notification.content,
        date: format(
          parseISO(notification.createdAt), "'dia' dd 'de' MMM', as' H:mm'h'",
          {locale: pt
          }),
        },
    })
  }
}

export default new NotificationMail();