export const Commands = {
  linux: {
    run_compose_servicio: (servicio: string) =>
      `sudo docker compose -f /home/ibisa/Escritorio/installer3/docker/docker-compose.yaml up -d ${servicio}`,
  },

  api_docker: {
    host: 'http://localhost:2375',
    list: '/containers/json',
    exec_id: (docker_id: string) => `/container/${docker_id}/exec`,
    exec_start: (exec_id: string) => `/exec/${exec_id}/start`,
  },
};
