export const Commands = {
  linux: {
    run_compose_servicio: (servicio: string) =>
      `sudo docker compose -f /home/ibisa/Escritorio/installer3/docker/docker-compose.yaml up -d ${servicio}`,
    telegraf_create_conf: 'sudo docker run --rm telegraf telegraf config > $PWD/docker/telegraf/telegraf.conf'
  },

  api_docker: {
    host: 'http://link2-desarrollo:2375',
    list: '/containers/json',
    exec_id: (docker_id: string) => `/containers/${docker_id}/exec`,
    exec_start: (exec_id: string) => `/exec/${exec_id}/start`,
    container: {
      restart: (container_id: string) => `/containers/${container_id}/restart`,
    }
  }
};
