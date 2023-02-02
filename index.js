import express from 'express'; //express
import mongoose from 'mongoose'; //mongoose
import multer from 'multer'; //multer
import cors from 'cors'; //cors
import {UserController, PostController} from './controllers/index.js' //UserController,  PostController
import {checkAuth, errorsHandler} from './utils/index.js' //CheckAuth , errorsHandler
import {registerValidator,loginValidator,PostCreateValidator} from './validation.js'; //Validators

// Блок базы данных
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('CLUSTER IS OK!')
  })
  .catch((err) => {
    console.log('err' + err)
  });
  // Блок базы данных



const app = express(); // Создаем приложение express

// Хранилище мультера
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage
});
// Хранилище мультера



app.use(express.json()); //express know what json is
app.use(cors()); // cors

//image upload
app.use('/uploads', express.static('uploads'));
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
}); 

//User routes
app.post('/auth/register', registerValidator, errorsHandler, UserController.register);
app.post('/auth/login',  loginValidator, errorsHandler, UserController.login)
app.get('/auth/me', checkAuth, errorsHandler, UserController.getMe);
//User routes

//posts routes
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, PostCreateValidator,errorsHandler, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostCreateValidator,errorsHandler,PostController.update);

app.get('/tags', PostController.getLastTags);
//posts routes

//запуск порта
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('OK!');
  }
}); //запуск порта 