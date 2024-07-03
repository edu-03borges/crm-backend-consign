import Instance from "#models/tb_instances";

import type { HttpContext } from '@adonisjs/core/http';

export default class InstanceController {
  async create({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user!;

    const data = request.body();

    const instanceSelect = await Instance.query()
      .where('instance', data.instance)
      .where('iduser', user.id)
      .first();

      if (!instanceSelect) {
        const instance = await Instance.create({ ...data, iduser: user.id });

        return instance;
      } else {
        return response.status(400).json({ message: "Essa instância já existe!" });
      }
  }

  async show({ auth }: HttpContext) {
    const user = auth.use('api').user!;

    const instances = await Instance
      .query()
      .where('iduser', user.id);

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

  async showStatus({ auth }: HttpContext) {
    const user = auth.use('api').user!;

    const instances = await Instance.query()
      .where('status', "LIVRE")
      .where('iduser', user.id);

    return instances;
  }

  async updateStatus({ request, response, params }: HttpContext) {

    const { status } = request.body();

    const { uuid } = params;

    const instance = await Instance.findBy('uuid', uuid);

    if (!instance) {
      return response.status(400).json({ message: 'Instância não encontrada' });
    }

    instance.status = status;

    await instance.save();

    return instance;
  }
}
