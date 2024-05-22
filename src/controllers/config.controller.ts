import { Request, Response } from 'express';

export async function InstallComponents(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ msg: 'Error en el API', error: error });
  }
}
