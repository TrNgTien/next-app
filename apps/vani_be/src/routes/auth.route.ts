import { Endpoints } from '@/common';
import { authServiceInstance } from '@/services';
const router = require('express').Router();

router.post(`${Endpoints.SIGN_IN}`, authServiceInstance.signIn);
router.post(`${Endpoints.SIGN_UP}`, authServiceInstance.signUp);

router.post(`${Endpoints.SIGN_IN_GOOGLE}`, authServiceInstance.signIn);
router.post(`${Endpoints.SIGN_UP_GOOGLE}`, authServiceInstance.signUp);

export default router;
