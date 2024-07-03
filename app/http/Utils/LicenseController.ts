import License from "#models/tb_licenses";
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

export default class LicenseController {
  async create({ request, response }: HttpContext) {
    const authorizationHeader = request.header('authorization');

    const { iduser, expiration_days } = request.body();

    try {
      if (authorizationHeader !== 'Bearer AdqCZJATisGlCdkfTrHlc7DJ2QwnD56blTAuC7pArKDutKBRKydUwwFp56685824a90176') {
        return response.status(401).json({ message: 'Autorização negada' });
      }

      const daysToAdd = parseInt(expiration_days, 10);
      if (isNaN(daysToAdd)) {
        return response.status(400).json({ message: 'O campo expiration_days deve ser um número válido.' });
      }

      const existingLicense = await License.query().where('iduser', iduser).first();
      let newExpirationDate;

      if (existingLicense) {
        const currentExpirationDate = DateTime.fromISO(existingLicense.expiration_date.toString());
        newExpirationDate = currentExpirationDate.plus({ days: daysToAdd }).toISO();
        existingLicense.expiration_date = newExpirationDate;
        await existingLicense.save();

        return response.status(200).json({ message: 'Licença atualizada com sucesso.', license: existingLicense });
      } else {
        newExpirationDate = DateTime.now().plus({ days: daysToAdd }).toISO();
        const license = await License.create({
          iduser,
          expiration_date: newExpirationDate,
        });

        return response.status(201).json({ message: 'Licença criada com sucesso.', license });
      }
    } catch (error) {
      return response.status(500).json({ message: 'Não foi possível criar a licença.' });
    }
  }
}
