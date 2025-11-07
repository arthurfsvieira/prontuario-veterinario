import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '10s',
};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZldGVyaW5hcmlvIiwiaWF0IjoxNzYyNT';

export default function () {
  // Teste de performance GET /animais
  let res = http.get('http://localhost:3000/animais', {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  check(res, {
    'status is 200': (r) => r.status === 200,
    'responde em < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(0.2);
}
