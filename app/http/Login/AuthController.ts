import User from "#models/tb_users";
import Company from "#models/tb_companies";
import License from "#models/tb_licenses";

import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const authorizationHeader = request.header('authorization');

    const data = request.body();

    if (authorizationHeader != 'Bearer AdqCZJATisGlCdkfTrHlc7DJ2QwnD56blTAuC7pArKDutKBRKydUwwFp56685824a90176')
      return response.status(401).json({ message: 'Autorização negada' });

    const userSelect = await User.query()
      .where('user', data.user)
      .first();

    if (!userSelect) {
      const user = await User.create({
        user: data.user,
        password: data.password,
      });

      const company = await Company.create({
        iduser: user.id,
        name: data.company,
      })

      return {
        id: user.id,
        user: user.user,
        company: company.name,
      };
    } else {
      return response.status(400).json({ message: "Esse usuário já existe!" });
    }
  }

  async authenticate({ request, response }: HttpContext) {
    const { user, password } = request.body();

    const userVerify = await User.verifyCredentials(user, password);

    const token = await User.accessTokens.create(userVerify, [], {
      expiresIn: '12h'
    });

    const companySelect = await Company.query()
      .where('iduser', userVerify.id)
      .first();

    const license = await License.query()
      .where('iduser', userVerify.id)
      .where('expiration_date', '>=', new Date())
      .first();

    if (!license) {
      return response.status(403).json({ message: 'Licença expirada ou não encontrada.' });
    }

    return {
      id: userVerify.id,
      uuid: userVerify.uuid,
      username: userVerify.user,
      company: companySelect.name,
      token,
    };
  }

  async logout({ auth }: HttpContext) {
    const user = auth.use('api').user!;

    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return { message: "success" };
  }

  async me({ auth }: HttpContext) {
    await auth.use('api').check();

    return {
      user: auth.user,
    }
  }
}
