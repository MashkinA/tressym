import { Router } from 'express';
import controller from './apiController.js';
import authMiddleware from "./middleware/authMiddleware.js";

const router = Router();

router.get('/races/list', authMiddleware, controller.getRaces);

router.get('/races/:raceId', authMiddleware, controller.getOneRace);

router.get('/classes/list', authMiddleware, controller.getClasses);

router.get('/classes/:classId', authMiddleware, controller.getOneClass);

router.get('/backgrounds/list', authMiddleware, controller.getBackgrounds);

router.get('/backgrounds/:backgroundId', authMiddleware, controller.getOneBackground);

router.get("/characteristics/:recommendedClassId", controller.getCharacteristic);

router.get("/skills/:recommendedClassId", controller.getSkill);



export default router;