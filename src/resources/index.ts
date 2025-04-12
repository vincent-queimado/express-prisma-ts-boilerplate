import { UsersControllers } from './users/controllers';


export function initResourceRoutes() {
  const routes = [
    new UsersControllers()
  ]

  return routes.map(route => route.router)

}
