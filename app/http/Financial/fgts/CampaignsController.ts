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
}
