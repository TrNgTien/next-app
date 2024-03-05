import { questionServiceInstance } from '@/services';
const router = require('express').Router();

router.get(`/count`, questionServiceInstance.getCount);

router.get(`/:id`, questionServiceInstance.getQuestionById);

export default router;
