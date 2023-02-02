import {body} from 'express-validator'

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail().toLowerCase(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5}),
    body('fullName', "Укажите корректное имя").isLength({min: 1}),
    body('avatarUrl', "Неверная ссылка на картинку").optional().isURL(),
];

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail().toLowerCase(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5}),
];

export const PostCreateValidator = [
    body('title'   , 'Введите заголов статьи').isLength({min: 5}).isString(),
    body('text'    , "Введите текст статьи").isLength({min: 10}).isString(),
    body('tags'    , 'Неверный формат тегов (укажите массив)').optional().isString(),
    body('imageUrl', "Неверная ссылка на изображение").optional().isString(),
];