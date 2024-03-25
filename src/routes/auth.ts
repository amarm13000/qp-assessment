const router=require('express').Router()
import AuthController from '../controllers/AuthController';

router.post('/login',AuthController.login);

router.post('/register',AuthController.register);


export default router;