import { SizeTypeFactory } from './../shared/models/sizetype/sizetype-factory';
import { SizeType } from './../shared/models/sizetype/sizetype';
let mysql = require('../modules/mysql');

export class SizeTypeService {

    static getAll(callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM size_types
                    WHERE sizeTypeDeleted = false                                        
                    ORDER BY sizeTypeDesc ASC`;
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

    static getById(sizeTypeId: number, callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM size_types
                    WHERE sizeTypeId = ?`;
        mysql.conn.query(query, sizeTypeId, (err, rows, fields) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) {
                return callback(null, false);
            }
            return callback(null, rows[0]);
        });
    };

    static getProductSizesByProductId(productId: number, showInactive: boolean, callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM (
                        SELECT *
                        FROM size_types
                    INNER JOIN product_sizes ON (sizeTypeId = refSizeType)) AS innerTable
                    WHERE refProduct = ?
                    ORDER BY sizeTypeAmount DESC`;
        if (!showInactive) query = query.replace('WHERE refProduct = ?',
            'WHERE refProduct = ? AND sizeActive = true');
        mysql.conn.query(query, productId, (err, rows, fields) => {
            if (err) {
                return callback(err);
            }
            if (!rows.length) {
                return callback(null, false);
            }
            return callback(null, rows);
        });
    };

    static getProductsSizes(showInactive: boolean, callback: (err: any, rows?: any) => void) {
        let query = `SELECT *
                    FROM size_types
                    INNER JOIN product_sizes ON (sizeTypeId = refSizeType)
                    ORDER BY sizeTypeAmount DESC`;
        if (!showInactive) query = query.replace('ORDER BY sizeTypeAmount DESC',
            'WHERE sizeActive = true ORDER BY sizeTypeAmount DESC');
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

    static addSizeType(sizeType: any, callback: (err: any, result?: any) => void) {
        sizeType.sizeTypeDeleted = false;
        let query = `INSERT INTO size_types SET ?`;
        mysql.conn.query(query, sizeType, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    };

    static updateSizeType(sizeType: any, callback: (err: any, result?: any) => void) {
        let query = `UPDATE size_types SET ?
                    WHERE sizeTypeId = ?`;
        mysql.conn.query(query, [sizeType, sizeType.sizeTypeId], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    };

    static deleteSizeType(sizeTypeId: number, callback: (err: any, result?: any) => void) {
        let query = `DELETE FROM size_types
                    WHERE sizeTypeId = ?`;
        mysql.conn.query(query, sizeTypeId, (err, result) => {
            if (err) {
                query = `UPDATE size_types SET sizeTypeDeleted = true
                WHERE sizeTypeId = ?`;
                mysql.conn.query(query, sizeTypeId, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, result);
                });
            }
            return callback(null, result);
        });
    };
}
