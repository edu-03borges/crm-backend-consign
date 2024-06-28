import User from "#models/tb_users";
import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {
  async register({ request, response }: HttpContext) {

    const data = request.body();

    const userSelect = await User.query()
      .where('user', data.user)
      .first();

    if (!userSelect) {
      const user = await User.create(data);

      return user;
    } else {
      return response.status(400).json({ message: "Esse usuário já existe!" });
    }
  }

  async authenticate({ request }: HttpContext) {
    const { user, password } = request.body();

    const userVerify = await User.verifyCredentials(user, password)

    const token = await User.accessTokens.create(userVerify, [], {
      expiresIn: '12h'
    });

    return token;
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!;

    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return { message: "success" };
  }

  async me({ auth }: HttpContext) {
    await auth.check();

    return {
      user: auth.user,
    }
  }
}
