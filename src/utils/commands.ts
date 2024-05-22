export const Commands = {
    linux: {
        run_compose_servicio: (servicio: string) => `sudo docker compose -f /home/ibisa/Escritorio/installer3/docker/docker-compose.yaml up -d ${servicio}`
    }
}