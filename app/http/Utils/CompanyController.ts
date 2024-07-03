import Company from "#models/tb_companies";
import type { HttpContext } from '@adonisjs/core/http';

export default class CompanyController {
  async getPublicUrl({ auth }: HttpContext) {
    const user = auth.use('api').user!;

    const companySelect = await Company.query()
      .where('iduser', user.id)
      .first();

    return companySelect?.public_url;
  }
}
