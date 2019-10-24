import todoRoutes from '../todo/todoRoutes';
import PropertyController from '../../collections/Property/propertyController';
import { GuardedRoutes } from '../abstract/guardedRoutes';
import fileService from '../../services/fileService';
import tenantRoutes from '../tenant/tenantRoutes';

class PropertyRoutes extends GuardedRoutes {
  private controller: PropertyController;

  constructor() {
    super();
    this.controller = new PropertyController();
    this._assignRoutes();
    this._useExternalRoutes();
  }

  protected _assignRoutes() {
    this.router.get('/', this.controller.getAllProperties);

    this.router.post('/', fileService.multer().single('image'), this.controller.createProperty);

    this.router.get('/:propertyId', this.controller.getProperty);

    this.router.delete('/:propertyId', this.controller.deleteProperty);

    this.router.put('/:propertyId', fileService.multer().single('image'), this.controller.updateProperty);
  }

  private _useExternalRoutes(): void {
    this.router.use('/:propertyId/todos', todoRoutes);

    this.router.use('/:propertyId/tenants', tenantRoutes);
  }
}

export default new PropertyRoutes().routes;