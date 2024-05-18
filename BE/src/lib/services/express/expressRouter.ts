import express from 'express';
import { BASE_URL_V1 } from '../../../common/constants.js';
/************************** Routes ***************************/
import userRoutes from '../../../modules/users/routes/index.js';

const router = express.Router();
/************************** Routes ***************************/
router.use(`${BASE_URL_V1}/users`, userRoutes);

router.get('/', (req, res) => {
    return res
      .status(200)
      .json({ success: true, message: 'Status is up & running.', data: null });
  });


export default router;