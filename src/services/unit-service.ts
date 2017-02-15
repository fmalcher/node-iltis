var mysql = require('../modules/mysql');

export class UnitService {

    getAll(callback:(err:any, rows?:any)=>void) {
        var query = 'SELECT * FROM product_units;';
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

    getById(id: number, callback:(err:any, rows?:any)=>void) {
        var query = 'SELECT * FROM product_units WHERE unitId = ?;';
        mysql.conn.query(query, id, (err, rows, fields) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) {
                return callback(null, false);
            }
            return callback(null, rows[0]);
        });
    };

    joinProducts(callback:(err:any, rows?:any)=>void) {
        var query = 'SELECT pu.unitId, pu.short, pu.full FROM product_units pu INNER JOIN products ON(unitId = refUnit) GROUP BY unitId;';
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
}
