import dotenv from "dotenv";
import User from "../../interfaces/user.js";
import UserService from "../services/user_service.js";

dotenv.config({ path: "./env/.env" });

const userService = new UserService();
const TAG = "UserController";

export default class UserController {

    async create(req, res) {
        try {
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.type = req.body.type;
            user.address = req.body.address;

            const result = await userService.create(user);

            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            
            res.status(201).json(result.data);
        } catch (error) {
            console.log(TAG + " create", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}