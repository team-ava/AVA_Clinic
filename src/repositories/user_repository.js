import User from "../../interfaces/user.js";

const TAG = 'UserRepository';

export default class UserRepository{

    async insert(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO clinic.user 
                                (id, name, email, password, address, type, created_at)
                                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                            RETURNING *`;
            const values = [user.id, user.name, user.email, user.password, user.address, user.type, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.address = result.rows[0].address;
                data.type = result.rows[0].type;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            console.log(TAG + ' insert', err.message)
            error = err;
        }
        return { data, error , status: 200};
    }
}