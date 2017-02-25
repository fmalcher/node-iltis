let mysql = require('../modules/mysql');

export class CategoryService {

    static getAll(callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM product_categories
                    ORDER BY categoryId ASC`;
        mysql.conn.query(query, (err, rows, fields) => {
            if (err) {
                return callback(err);
            }
            if (!rows.length) {
                return callback(null, false);
            }
            return callback(null, rows);
        });
    };

    static getById(categoryId: number, callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM product_categories
                    WHERE categoryId = ?`;
        mysql.conn.query(query, categoryId, (err, rows, fields) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) {
                return callback(null, false);
            }
            return callback(null, rows[0]);
        });
    };
}
