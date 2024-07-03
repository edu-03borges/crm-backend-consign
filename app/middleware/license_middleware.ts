import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import License from "#models/tb_licenses";

export default class LicenseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('api').user;

    const license = await License.query()
      .where('iduser', user.id)
      .where('expiration_date', '>=', new Date())
      .first();

    if (!license) {
      return ctx.response.status(403).json({ message: 'Licença expirada ou não encontrada.' });
    }

    await next();
  }
}
