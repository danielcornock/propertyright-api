import propertyRoutes from './property/propertyRoutes';
import todoRoutes from './todo/todoRoutes';
import authRoutes from './authentication/authRoutes';

export class Routes {
  constructor(private app: any) {
    this.initialiseRoutes(this.app);
  }

  public initialiseRoutes(app: any): void {
    app.use('/api/v1/users', authRoutes);
    app.use('/api/v1/properties', propertyRoutes);
    app.use('/api/v1/todos', todoRoutes);
  }
}
