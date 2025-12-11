import Race from './models/Race.js'
import Class from "./models/Class.js";
import Background from "./models/Background.js";
import Characteristic from "./models/Characteristic.js";
import Skill from "./models/Skill.js";

class apiController {
    async getRaces(req, res) {
        try {
            const races = await Race.find();
            res.json(races);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения расс" });
        }
    }

    async getOneRace(req, res) {
        try {
            const { raceId } = req.params;

            if (!raceId) {
                return res.status(400).json({ message: "raceId is required" });
            }

            const data = await Race.findOne({
                raceId: Number(raceId)
            });

            if (!data) {
                return res.status(404).json({
                    message: `Нет данных для raceId = ${raceId}`
                });
            }

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения конкретной рассы" });
        }
    }

    async getClasses(req, res) {
        try {
            const classes = await Class.find();
            res.json(classes);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения классов" });
        }
    }

    async getOneClass(req, res) {
        try {
            const { classId } = req.params;

            if (!classId) {
                return res.status(400).json({ message: "classId is required" });
            }

            const data = await Class.findOne({
                classId: Number(classId)
            });

            if (!data) {
                return res.status(404).json({
                    message: `Нет данных для classId = ${classId}`
                });
            }

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения конкретного класса" });
        }
    }

    async getBackgrounds(req, res) {
        try {
            const backgrounds = await Background.find();
            res.json(backgrounds);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения предысторий" });
        }
    }

    async getOneBackground(req, res) {
        try {
            const { backgroundId } = req.params;

            if (!backgroundId) {
                return res.status(400).json({ message: "backgroundId is required" });
            }

            const data = await Background.findOne({
                backgroundId: Number(backgroundId)
            });

            if (!data) {
                return res.status(404).json({
                    message: `Нет данных для backgroundId = ${backgroundId}`
                });
            }

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения конкретной предыстории" });
        }
    }

    async getCharacteristic(req, res) {
        try {
            const { recommendedClassId } = req.params;

            if (!recommendedClassId) {
                return res.status(400).json({ message: "recommendedClassId is required" });
            }

            const data = await Characteristic.findOne({
                recommendedClassId: Number(recommendedClassId)
            });

            if (!data) {
                return res.status(404).json({
                    message: `Нет данных для recommendedClassId = ${recommendedClassId}`
                });
            }

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения характеристик" });
        }
    }

    async getSkill(req, res) {
        try {
            const { recommendedClassId } = req.params;

            if (!recommendedClassId) {
                return res.status(400).json({ message: "recommendedClassId is required" });
            }

            const data = await Skill.findOne({
                recommendedClassId: Number(recommendedClassId)
            });

            if (!data) {
                return res.status(404).json({
                    message: `Нет данных для recommendedClassId = ${recommendedClassId}`
                });
            }

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения навыков" });
        }
    }
}

export default new apiController();