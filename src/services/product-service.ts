var mysql = require('../modules/mysql');

export class ProductService {

    getAll(callback:(err:any, rows?:any)=>void) {
        var query = 'SELECT * FROM products;';
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
        var query = 'SELECT * FROM products WHERE productId = ?;';
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

    /*
    idExists(id: number, callback:(err:any, rows?:any)=>void) {
        return !!this.getById(id, callback);
    }
    
    create(product: Product) {
        this.products.push(product);
    };

    update(product: Product) {
        this.delete(product.id);
        this.create(product);
    };

    delete(id: number) {
        return this.products = this.products.filter(product => product.id !== id);
    };

    reset() {
        this.products = SomeProducts.get();
    };
    */
}
