import Instance from "#models/tb_instance";

import type { HttpContext } from '@adonisjs/core/http';

export default class InstanceController {
  async create({ request, response }: HttpContext) {

    const data = request.body();

    const instanceSelect = await Instance.query()
      .where('instance', data.instance)
      .first();

      if (!instanceSelect) {
        const instance = await Instance.create(data);

        return instance;
      } else {
        return response.status(400).json({ message: "Essa instância já existe!" });
      }
  }

  async show({ }: HttpContext) {

    const instances = await Instance.query();

    return instances;
  }

  async delete({ response, params }: HttpContext) {

    const { uuid } = params;

    const instance = await Instance.findBy('uuid', uuid);

    if (!instance) {
      return response.status(400).json({ message: 'Instância não encontrada' });
    }

    await instance.delete();

    return instance;
  }

  async showStatus({ }: HttpContext) {

    const instances = await Instance.query()
      .where('status', "LIVRE");

    return instances;
  }
}
