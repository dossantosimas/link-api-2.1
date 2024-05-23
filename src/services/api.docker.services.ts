const { execSync } = require('child_process');
import { Commands } from '../utils/commands';
import { IExecId, IDockerContainer } from '../models/docker.model';

class DockerAPIServices {
  async ListaContenedores(): Promise<IDockerContainer[] | null> {
    try {
      console.log('URL:', Commands.api_docker.host + Commands.api_docker.list);
      const response = await fetch(
        Commands.api_docker.host + Commands.api_docker.list
      );
      const container_lista: IDockerContainer[] = await response.json();

      return container_lista;
    } catch (error) {
      console.error('ListaContenedores:', error);
      return null;
    }
  }

  async GetContenedor(name: string): Promise<IDockerContainer | null> {
    try {
      const lista = await this.ListaContenedores();

      if (lista) {
        const container_influxdb = lista.find(
          (container) => container.Names[0] === `/${name}`
        );
        if (container_influxdb) {
          return container_influxdb;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('ListaContenedores:', error);
      return null;
    }
  }

  async ExecId(contenedor_id: string, body: Object): Promise<IExecId | null> {
    try {
      const response = await fetch(
        Commands.api_docker.host + Commands.api_docker.exec_id(contenedor_id),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ExecId:', error);
      return null;
    }
  }

  async RunExec(exec_id: string): Promise<string | null> {
    try {
      const response = await fetch(
        Commands.api_docker.host + Commands.api_docker.exec_start(exec_id),
        {
          method: 'POST',
        }
      );
      const data = await response.text();

      return data;
    } catch (error) {
      console.error('RunExec:', error);
      return null;
    }
  }
}

export const DockerAPI = new DockerAPIServices();
