import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '10s',
};

export default function () {
  // Teste de performance GET /animais
  let res = http.get('http://localhost:3000/animais', {
    headers: { Authorization: 'Bearer TOKEN_AQUI' },
  });
  check(res, {
    'status is 200': (r) => r.status === 200,
    'responde em < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(0.2);
}
