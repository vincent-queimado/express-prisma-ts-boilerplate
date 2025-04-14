import { UsersControllers } from './users/controllers';
import { AppControllers } from './apps/controllers';


export function initResourceRoutes() {
  const routes = [
    new UsersControllers(),
    new AppControllers()
  ]

  return routes.map(route => route.router)

}
