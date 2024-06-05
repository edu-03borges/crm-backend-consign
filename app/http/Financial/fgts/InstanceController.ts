import Instance from "#models/tb_instance";

import type { HttpContext } from '@adonisjs/core/http';

export default class InstanceController {
  async create({ request, response }: HttpContext) {

    const data = request.body();

    const instance = await Instance.create(data);

    return instance;
  }

  async show({ request, response }: HttpContext) {

    const instances = await Instance.query();

    return instances;
  }
}
