const { execSync } = require('child_process');

class DockerComposeServices {
  private readonly run_compose_servicio = (servicio: string) =>
    `sudo docker compose -d ${servicio}`;

  async InstallServicio(servicio: string): Promise<boolean> {
    try {
      const resultado = execSync('ls').toString();
      console.log(`Resultado:\n${resultado}`);

      return true;
    } catch (error) {
      console.error('ListaContenedores:', error);
      return false;
    }
  }
}

export const DockerCompose = new DockerComposeServices();
