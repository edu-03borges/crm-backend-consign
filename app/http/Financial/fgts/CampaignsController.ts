import Campaign from "#models/tb_campaign";

import type { HttpContext } from '@adonisjs/core/http';

export default class CampaignsController {
  async create({ request, response }: HttpContext) {

    const data = request.body();

    const campaign = await Campaign.create(data);

    return campaign;
  }

  async show({ request, response }: HttpContext) {

    const campaigns = await Campaign.query();

    return campaigns;
  }

  async downloadFiles({ params, request, response }: HttpContext) {

    const { uuid } = params;

    const files = await Campaign.query()
      .select(['xlsx_success', 'xlsx_error'])
      .where('uuid', uuid)
      .first();

    return files;
  }
}
