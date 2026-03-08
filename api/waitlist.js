// Vercel Serverless Function — TPV Ya Waitlist
// Crea un contacto en HubSpot con origen tpvya.com
// Requiere env var: HUBSPOT_TOKEN (Private App Token de HubSpot)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://tpvya.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return res.status(500).json({ error: 'Token no configurado' });

  try {
    // Intentamos crear el contacto; si ya existe, actualizamos
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        properties: {
          email,
          hs_lead_status: 'NEW',
          lifecyclestage: 'lead',
          lead_source_detail: 'tpvya.com — waitlist',
          hs_analytics_source: 'DIRECT_TRAFFIC'
        }
      })
    });

    if (response.status === 409) {
      // Contacto ya existe — lo actualizamos con el origen
      const existing = await response.json();
      const existingId = existing.message?.match(/ID: (\d+)/)?.[1];
      if (existingId) {
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            properties: { lead_source_detail: 'tpvya.com — waitlist' }
          })
        });
      }
      return res.status(200).json({ ok: true, note: 'contact_updated' });
    }

    if (!response.ok) {
      const err = await response.json();
      console.error('HubSpot error:', err);
      return res.status(500).json({ error: 'Error al registrar' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
