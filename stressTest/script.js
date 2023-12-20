import http from 'k6/http';
import { check, sleep } from 'k6';

import { userData } from './payload.js'

const baseUrl = 'http://locahost:9999/pessoas';

export const options = {
  stages: [
    { duration: '10s', vus: 10 }
  ]
};

export default function() {
  const person = userData()
  const data = JSON.stringify(person)

  const headers = { 'Content-Type': 'application/json' }

  const response = http.post(baseUrl, data, { headers })

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200
  })

  sleep(1);
}
