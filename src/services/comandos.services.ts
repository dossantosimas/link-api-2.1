const { execSync } = require('child_process');
import { getOS } from '../utils/so';

class ComandosLocalesServices {
  async Run(comando: string): Promise<boolean> {
    try {
      const OS = getOS();
      let result;
      if (OS === 'L') {
        result = execSync(comando).toString();
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


export const ComandoLocales = new ComandosLocalesServices()