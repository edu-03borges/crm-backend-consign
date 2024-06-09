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

  async delete({ request, response, params }: HttpContext) {

    const { uuid } = params;

    const campaign = await Campaign.findBy('uuid', uuid);

    if (!campaign) {
      return response.status(400).json({ message: 'Instância não encontrada' });
    }

    await campaign.delete();

    return campaign;
  }

  async searchData({ params, request, response }: HttpContext) {

    const { uuid } = params;

    const data = await Campaign.query()
      .select(['query_data', 'name'])
      .where('uuid', uuid)
      .first();

    return data;
  }
}
