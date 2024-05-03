import { message } from 'antd';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export const messages = {
  auth: {
    userexists: {
      status: 409,
      message: 'Ya existe un usuario con ese correo',
      redirect: false,
    },
    wrongcredentials: {
      status: 401,
      message: 'Correo o contraseña incorrects',
      redirect: false,
    },
    missingcredentials: {
      message: 'Faltan credenciales',
      redirect: false,
    },
    missingheader: {
      message: 'Request con header faltante',
      redirect: true,
    },
    invalidheader: {
      message: 'Request mal formado',
      redirect: true,
    },
    invalidtoken: {
      message: 'Error de request, no autenticado',
      redirect: true,
    },
    invalidrefreshtoken: {
      message: 'Error de request, no autenticado',
      redirect: true,
    },
    notauthenticated: {
      message: 'No autenticado',
      redirect: true,
    },
    notauthorized: {
      message: 'No estas autorizado para esta accion',
      redirect: true,
    },
  },
  global: {
    internalerror: {
      message: 'Lo sentimos, sucedio un error interno',
      redirect: true,
    },
    invalidrequest: {
      message: 'Request invalida',
      Redirect: true,
    },
    pagenotfound: {
      message: 'La pagina no existe',
      redirect: true,
    },
  },
  user: {
    notfound: {
      message: 'No se encontró el usuario',
      redirect: false,
    },
  },
  profile: {
    notfound: {
      message: 'No se encontró el usuario',
      redirect: false,
    },
    alreadyexists: {
      message: 'Ya existe una cuenta asi',
      redirect: false,
    },
  },

  role: {
    notfound: {
      message: 'No se encontró el rol',
      redirect: false,
    },
    alreadyexists: {
      message: 'Ya existe un rol asi',
      redirect: false,
    },
    defaultnotconfigured: {
      message: 'El rol por defecto no esta configurado',
      redirect: true,
    },
  },
  validation: {
    invalidrequest: {
      message: 'Hubo un problema con los datos',
      Redirect: false,
    },
  },
};

export const ourOwn = [409, 401, 403, 500, 400, 404];
