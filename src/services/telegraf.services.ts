const { execSync } = require('child_process');
import { getOS } from '../utils/so';
import { Commands } from '../utils/commands';

class TelegrafServices {
  async CreateConfFile(): Promise<boolean> {
    try {
      const OS = getOS();
      let result;
      if (OS === 'L') {
        result = execSync(
          Commands.linux.run_compose_servicio(
            Commands.linux.telegraf_create_conf
          )
        ).toString();
        console.log(`Resultado:\n${result}`);
        return true;
      }

      return true;
    } catch (error) {
      console.error('ListaContenedores:', error);
      return false;
    }
  }
}

export const Telegraf = new TelegrafServices()