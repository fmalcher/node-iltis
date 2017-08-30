import { createServer, bodyParser, CORS, queryParser, serveStatic, NotFoundError } from 'restify';
import * as multer from 'multer';

import { FileUploadService } from './src/services/file-upload.service';
import { ProductController } from './src/controller/product-controller';
import { ServerController } from './src/controller/server-controller';
import { CategoryController } from './src/controller/category-controller';
import { UnitController } from './src/controller/unit-controller';
import { SizeTypeController } from './src/controller/sizetype-controller';
import { CrateTypeController } from './src/controller/cratetype-controller';
import { EventController } from './src/controller/event-controller';
import { EventTypeController } from './src/controller/eventtype-controller';
import { InventoryController } from './src/controller/inventory-controller';
import { TinyJson } from './src/shared/tinyjson';

const config = require('./config');

const serverController = new ServerController();
const productController = new ProductController();
const categoryController = new CategoryController();
const unitController = new UnitController();
const sizeTypeController = new SizeTypeController();
const crateTypeController = new CrateTypeController();
const eventController = new EventController();
const eventTypeController = new EventTypeController();
const inventoryController = new InventoryController();
const inventoryTypeController = new InventoryController();

let server = createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            return cb(null, TinyJson.getJSON(body));
        }
    }
});

server.use(bodyParser());
server.use(CORS({}));
server.use(queryParser());

// other routes
server.get('/info', serverController.info.bind(serverController));
server.get('/swagger.json', serverController.getFixedSwaggerJson.bind(serverController));

// API routes (GET)
server.get('/products', productController.getAll.bind(productController));
server.get('/product/:productId', productController.getById.bind(productController));
server.put('/product/:productId/image', productController.uploadImage.bind(productController));
server.get('/events', eventController.getAll.bind(eventController));
server.get('/event/checkpermission', eventController.checkPermission.bind(eventController));
server.get('/event/:eventId', eventController.getById.bind(eventController));
server.get('/event/:eventId/inventory', eventController.getEventInventoryTransfers.bind(eventController));
server.get('/event/:eventId/transfers', eventController.getEventTransfers.bind(eventController));
server.get('/event/:eventId/transactions', eventController.getEventTransactions.bind(eventController));
server.get('/event/:eventId/calculation', eventController.getCalculation.bind(eventController));
server.get('/event/:eventId/costs', eventController.getTransferCosts.bind(eventController));
server.get('/eventtypes', eventTypeController.getAll.bind(eventTypeController));
server.get('/eventtype/:eventTypeId', eventTypeController.getById.bind(eventTypeController));
server.get('/categories', categoryController.getAll.bind(categoryController));
server.get('/category/:categoryId', categoryController.getById.bind(categoryController));
server.get('/units', unitController.getAll.bind(unitController));
server.get('/unit/:unitId', unitController.getById.bind(unitController));
server.get('/sizetypes', sizeTypeController.getAll.bind(sizeTypeController));
server.get('/sizetype/:sizeTypeId', sizeTypeController.getById.bind(sizeTypeController));
server.get('/cratetypes', crateTypeController.getAll.bind(crateTypeController));
server.get('/cratetype/:crateTypeId', crateTypeController.getById.bind(crateTypeController));
server.get('/inventory', inventoryController.getCurrent.bind(inventoryController));
server.get('/inventory/:eventId', inventoryController.getByEventId.bind(inventoryController));

// API routes (POST)
server.post('/event', eventController.addEvent.bind(eventController));
server.post('/event/:eventId/close', eventController.closeEvent.bind(eventController));
server.post('/event/:eventId/transfers/storage/out', eventController.addTransferStorageOut.bind(eventController));
server.post('/event/:eventId/transfers/storage/in', eventController.addTransferStorageIn.bind(eventController));
server.post('/event/:eventId/transfers/counter/out', eventController.addTransferCounterOut.bind(eventController));
server.post('/event/:eventId/transfers/storage/count', eventController.countStorage.bind(eventController));
server.post('/event/:eventId/transfers/counter/count', eventController.countCounter.bind(eventController));

// API routes (PUT)
server.put('/event/:eventId', eventController.updateEvent.bind(eventController));

// API routes (DELETE)
server.del('/event/:eventId', eventController.deleteEvent.bind(eventController));

// serve public folder
server.get(/^\/*/, serveStatic({
    directory: __dirname + '/public/',
    default: 'index.html'
}));

server.listen(config.port, () => {
    console.log('ILTIS API on %s', server.url);
});
