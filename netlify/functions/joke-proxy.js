// netlify/functions/jokes-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const qs = event.queryStringParameters || {};
    const count = qs.count ? `?count=${encodeURIComponent(qs.count)}` : '';
    const target = `https://yomomma-api.herokuapp.com/jokes/random${count}`;

    const r = await fetch(target);
    const body = await r.text();

    return {
      statusCode: r.status,
      headers: {
        'Content-Type': r.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
