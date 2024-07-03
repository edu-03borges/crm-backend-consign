import Campaign from "#models/tb_campaigns";

import type { HttpContext } from '@adonisjs/core/http';

export default class CampaignsController {
  async create({ request, auth }: HttpContext) {
    const user = auth.use('api').user!;

    const data = request.body();

    const campaign = await Campaign.create({ ...data, iduser: user.id });

    return campaign;
  }

  async show({ auth }: HttpContext) {
    const user = auth.use('api').user!;

    const campaigns = await Campaign
      .query()
      .where('iduser', user.id);

    return campaigns;
  }

  async delete({ response, params }: HttpContext) {

    const { uuid } = params;

    const campaign = await Campaign.findBy('uuid', uuid);

    if (!campaign) {
      return response.status(400).json({ message: 'Instância não encontrada' });
    }

    await campaign.delete();

    return campaign;
  }

  async searchData({ params, auth }: HttpContext) {

    const user = auth.use('api').user!;

    const { uuid } = params;

    const data = await Campaign.query()
      .select(['query_data', 'name'])
      .where('uuid', uuid)
      .where('iduser', user.id)
      .first();

    return data;
  }
}
