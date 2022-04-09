import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserCotroller';
import SessionController from './app/controllers/SessionController';
import NotificationController from './app/controllers/NotificationController';
import AnimalController from './app/controllers/animalController';
import fileController from './app/controllers/fileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.put('/users/avatar', UserController.updateAvatar);
routes.post('/files', upload.single('file'), fileController.store);
routes.post('/notifications', NotificationController.store)
routes.get('/notifications/:id', NotificationController.index)
routes.put('/notifications', NotificationController.update)
routes.get('/animals', AnimalController.index)
routes.post('/animals', AnimalController.store)
routes.get('/animals/user', AnimalController.getPostsForUser)
routes.put('/animals/:id', AnimalController.update)

export default routes;