export const Commands = {
    linux: {
        run_compose_servicio: (servicio: string) => `sudo docker compose -d ${servicio}`
    }
}