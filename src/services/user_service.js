import pool from "../repositories/pool.js";
import {v4 as uuid} from "uuid";
import crypto from "crypto";
import UserRepository from "../repositories/user_repository.js";

const TAG = "UserService";
const userRepository = new UserRepository();

export default class UserService{

    validate(user){

        if (!user.name || user.name.length < 4) {
            return Error("name must be at least 4 characters");
        }
        else if (!user.email) {
            return Error("email if required");
        }
        else if (!user.password || user.password.length < 8) {
            return Error("password must be at least 8 characters");
        }
        else if (!user.address) {
            return Error("address if required");
        }
    }

    async create(user) {
        let result = { data: [], error: null, status: null };
        try {
            result.error = this.validate(user);
            if (result.error != null){
                result.status = 400;
                return result
            };
            user.id = uuid();
            user.password = crypto.createHash("sha256").update(user.password).digest("hex");
            result = await userRepository.insert(pool, user);
        } catch (error) {
            console.log(TAG + "create", error);
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
