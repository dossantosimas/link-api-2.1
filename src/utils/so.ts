import * as os from 'os';

export function getOS(): "W" | "L" | "M" | null {
    const plataforma = os.platform();
    if (plataforma === 'win32') {
        return 'W';
    } else if (plataforma === 'linux') {
        return 'L';
    } else if (plataforma === 'darwin') {
        return 'M';
    } else {
        return null
    }
}
