import Company from "#models/tb_companies";
import type { HttpContext } from '@adonisjs/core/http';

export default class CompanyController {
  async create({ request, response }: HttpContext) {
    const data = request.body();

    const companySelect = await Company.query()
      .max('code as code')
      .first();

    if (companySelect && companySelect.code !== null) {
      const company = await Company.create({ ...data, code: Number(companySelect.code)+1 });

      return company;
    } else {
      return response.status(400).json({ message: "Essa empresa já existe!" });
    }
  }

  async getPublicUrl({ params }: HttpContext) {
    const { code } = params;

    const companySelect = await Company.query()
      .where('code', code)
      .first();

    return companySelect?.public_url;
  }
}
