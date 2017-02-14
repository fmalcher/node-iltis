import { NotFoundError, BadRequestError, ConflictError } from 'restify';
import { SizeType } from '../models/sizetype/sizetype';
import { SizeTypeFactory } from '../models/sizetype/sizetype-factory';
import { SizeTypeService } from '../services/sizetype-service';
import { Validator } from '../modules/validator';

export class SizeTypeController {

    constructor(private sizeTypeService : SizeTypeService) { }

    getAll(req, res, next) {
        let sizeTypes : SizeType[] = [];
        this.sizeTypeService.getAll((err, rows)=>{
            if (err) return next(err);
            if (!rows.length) {
                // Todo: Implementet correct feedback (error 204)
                res.send(sizeTypes, { 'Content-Type': 'application/json; charset=utf-8' });
            }
            else { 
                sizeTypes = rows.map(row => SizeTypeFactory.fromJson(row));
                res.send(sizeTypes, { 'Content-Type': 'application/json; charset=utf-8' });
            }
        });
    };

    getById(req, res, next) {
        let id = parseInt(req.params.sizeTypeId);
        let sizeType : SizeType = SizeTypeFactory.empty();
        this.sizeTypeService.getById(id, (err, row)=>{
            if (err) return next(err);
            if (!row) {
                // Todo: Implementet correct feedback (error 204)
                res.send(new NotFoundError('SizeType does not exist'), { 'Content-Type': 'application/json; charset=utf-8' });
            }
            else { 
                sizeType = SizeTypeFactory.fromJson(row);
                res.send(sizeType, { 'Content-Type': 'application/json; charset=utf-8' });
            }
        });
    };
}