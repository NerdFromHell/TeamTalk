import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  SOCKET_ENDPOINT: 'http://localhost:3000',
  httpOptions: {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
    })
  },
};
