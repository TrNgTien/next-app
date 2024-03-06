import { questionServiceInstance } from '@/services';
const router = require('express').Router();

router.get(`/count`, questionServiceInstance.getCount);

router.get(`/:id`, questionServiceInstance.getQuestionById);

router.post(`/:id`, questionServiceInstance.answerQuestion);

export default router;
