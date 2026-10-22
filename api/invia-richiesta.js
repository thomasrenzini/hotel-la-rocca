import nodemailer from 'nodemailer';
import querystring from 'querystring';

// ==============================================================================
// CONFIGURAZIONE RECAPITI ED SMTP
// ==============================================================================
const DESTINATARIO_HOTEL = process.env.EMAIL_HOTEL || "renzinithomas@gmail.com";
const SMTP_USER = process.env.SMTP_USER || "renzinithomas@gmail.com";
const SMTP_PASS = (process.env.SMTP_PASS || "kuee ebke pbhz cdxc").replace(/\s+/g, "");

// ==============================================================================
// GENERATORE EMAIL 1: NOTIFICA HOTEL
// ==============================================================================
function generaEmailHotel(data) {
  const camera = data.camera_selezionata || 'Da definire';
  const checkin = data.checkin || 'Non specificato';
  const checkout = data.checkout || 'Non specificato';
  const adulti = data.ospiti_adulti || '1';
  const bambini = data.ospiti_bambini || '0';
  const nome = data.nome_cognome || 'Anonimo';
  const emailCliente = data.email || 'Nessuna email';
  const telefono = data.telefono || 'Non fornito';
  const note = data.richieste_speciali || 'Nessuna nota';
  const lang = (data.lang || 'it').toUpperCase();
  const dataInvio = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuova Richiesta Preventivo – Hotel La Rocca</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f1ec;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ec;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">
      <tr>
        <td style="background-color:#232920;padding:32px 40px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:24px;font-weight:600;letter-spacing:2px;color:#FAF8F5;text-transform:uppercase;">Hotel La Rocca</div>
          <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:6px;color:#C5A059;margin-top:4px;text-transform:uppercase;">San Marino &bull; Centro Storico</div>
        </td>
      </tr>
      <tr>
        <td style="background:#C5A059;padding:12px 40px;text-align:center;">
          <span style="color:#0b1612;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">&#128274; Nuova Richiesta di Preventivo</span>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px 24px;">
          <div style="padding:10px 16px;background:#eef5f1;border-left:4px solid #1e5c3a;border-radius:4px;font-size:13px;color:#1e5c3a;font-weight:600;margin-bottom:20px;">
            &#127760; Lingua richiesta: <strong>${lang}</strong> &bull; Data: ${dataInvio}
          </div>
          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
            È arrivata una nuova richiesta di preventivo dal sito web dell'Hotel La Rocca:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #eee;border-radius:6px;overflow:hidden;">
            <tr style="background:#FAF8F5;"><td style="padding:12px 16px;font-weight:600;color:#232920;width:35%;">Camera</td><td style="padding:12px 16px;color:#C5A059;font-weight:700;">${camera}</td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#232920;">Periodo</td><td style="padding:12px 16px;">Dal <strong>${checkin}</strong> al <strong>${checkout}</strong></td></tr>
            <tr style="background:#FAF8F5;"><td style="padding:12px 16px;font-weight:600;color:#232920;">Ospiti</td><td style="padding:12px 16px;">${adulti} Adulti, ${bambini} Bambini</td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#232920;">Cliente</td><td style="padding:12px 16px;"><strong>${nome}</strong></td></tr>
            <tr style="background:#FAF8F5;"><td style="padding:12px 16px;font-weight:600;color:#232920;">Email</td><td style="padding:12px 16px;"><a href="mailto:${emailCliente}" style="color:#C5A059;font-weight:600;">${emailCliente}</a></td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#232920;">Telefono</td><td style="padding:12px 16px;">${telefono}</td></tr>
            <tr style="background:#FAF8F5;"><td style="padding:12px 16px;font-weight:600;color:#232920;">Note / Richieste</td><td style="padding:12px 16px;font-style:italic;">${note}</td></tr>
          </table>
          <div style="text-align:center;margin:30px 0 10px;">
            <a href="mailto:${emailCliente}?subject=Riscontro%20Preventivo%20Hotel%20La%20Rocca%20San%20Marino" style="display:inline-block;background:#C5A059;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
              Rispondi al Cliente (${emailCliente})
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="background:#232920;color:#FAF8F5;padding:18px 40px;text-align:center;font-size:11px;opacity:0.8;">
          Hotel La Rocca &bull; Via Salita alla Rocca 33/35, 47890 San Marino (RSM)
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ==============================================================================
// GENERATORE EMAIL 2: CONFERMA AL CLIENTE
// ==============================================================================
function generaEmailCliente(data) {
  const lang = (data.lang || 'it').toLowerCase();
  const nome = data.nome_cognome || '';
  const camera = data.camera_selezionata || '';
  const checkin = data.checkin || '';
  const checkout = data.checkout || '';

  const t = {
    it: {
      subject: "Richiesta ricevuta – Hotel La Rocca, San Marino",
      badge: "Richiesta Ricevuta con Successo",
      greeting: `Gentile ${nome},`,
      lead: "Grazie per aver contattato l'Hotel La Rocca. Abbiamo ricevuto la tua richiesta di preventivo e il nostro staff sta verificando la disponibilità delle nostre camere per il periodo richiesto.",
      details: "Riepilogo della richiesta:",
      room: "Camera",
      dates: "Date",
      promise: "Riceverai una nostra proposta personalizzata con la <strong>Miglior Tariffa Garantita</strong> entro 24 ore lavorative.",
      contactLead: "Hai bisogno di assistenza immediata?",
      ctaCall: "Chiamaci: +378 0549 991166"
    },
    en: {
      subject: "Inquiry received – Hotel La Rocca, San Marino",
      badge: "Inquiry Received Successfully",
      greeting: `Dear ${nome},`,
      lead: "Thank you for contacting Hotel La Rocca. We have received your inquiry and our team is checking room availability for your selected dates.",
      details: "Inquiry Summary:",
      room: "Room",
      dates: "Dates",
      promise: "You will receive our personalized quote with our <strong>Best Rate Guarantee</strong> within 24 business hours.",
      contactLead: "Need urgent assistance?",
      ctaCall: "Call us: +378 0549 991166"
    },
    de: {
      subject: "Anfrage erhalten – Hotel La Rocca, San Marino",
      badge: "Anfrage erfolgreich erhalten",
      greeting: `Sehr geehrte(r) ${nome},`,
      lead: "Vielen Dank für Ihre Anfrage im Hotel La Rocca. Wir haben Ihre Nachricht erhalten und prüfen die Verfügbarkeit für Ihren Reisezeitraum.",
      details: "Zusammenfassung:",
      room: "Zimmer",
      dates: "Daten",
      promise: "Sie erhalten unser maßgeschneidertes Angebot mit unserer <strong>Bestpreis-Garantie</strong> innerhalb von 24 Stunden.",
      contactLead: "Dringende Fragen?",
      ctaCall: "Rufen Sie uns an: +378 0549 991166"
    },
    fr: {
      subject: "Demande reçue – Hôtel La Rocca, Saint-Marin",
      badge: "Demande reçue avec succès",
      greeting: `Cher(e) ${nome},`,
      lead: "Merci d'avoir contacté l'Hôtel La Rocca. Nous avons bien reçu votre demande de devis et vérifions la disponibilité des chambres pour vos dates.",
      details: "Récapitulatif :",
      room: "Chambre",
      dates: "Dates",
      promise: "Vous recevrez notre offre sur mesure avec notre <strong>Meilleur Tarif Garanti</strong> sous 24 heures ouvrées.",
      contactLead: "Besoin d'aide immédiate ?",
      ctaCall: "Appelez-nous : +378 0549 991166"
    }
  }[lang] || t.it;

  return {
    subject: t.subject,
    html: `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#232920;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FAF8F5;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#232920;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1d221b;border:1px solid rgba(197,160,89,0.3);border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:32px 40px;text-align:center;border-bottom:2px solid #C5A059;">
          <div style="font-family:Georgia,serif;font-size:24px;font-weight:600;letter-spacing:2px;color:#FAF8F5;text-transform:uppercase;">Hotel La Rocca</div>
          <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:6px;color:#C5A059;margin-top:4px;text-transform:uppercase;">San Marino &bull; Centro Storico</div>
        </td>
      </tr>
      <tr>
        <td style="background:rgba(197,160,89,0.15);padding:10px 40px;text-align:center;">
          <span style="color:#C5A059;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">&check; ${t.badge}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px;line-height:1.7;color:#FAF8F5;">
          <h3 style="color:#C5A059;margin:0 0 16px;font-size:18px;">${t.greeting}</h3>
          <p style="margin:0 0 20px;font-size:14px;color:#D8D3C6;">${t.lead}</p>
          <div style="background:rgba(250,248,245,0.05);border-left:3px solid #C5A059;padding:14px 18px;border-radius:4px;margin-bottom:24px;font-size:13px;">
            <div><strong>${t.room}:</strong> ${camera}</div>
            <div style="margin-top:4px;"><strong>${t.dates}:</strong> ${checkin} &rarr; ${checkout}</div>
          </div>
          <p style="margin:0 0 24px;font-size:14px;color:#D8D3C6;">${t.promise}</p>
          <div style="text-align:center;margin:30px 0 10px;">
            <a href="tel:+3780549991166" style="display:inline-block;background:#C5A059;color:#232920;text-decoration:none;padding:12px 28px;border-radius:4px;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
              ${t.ctaCall}
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="background:#151813;color:#888;padding:18px 40px;text-align:center;font-size:11px;">
          Hotel La Rocca &bull; Via Salita alla Rocca 33/35, 47890 San Marino (RSM)<br>
          <a href="https://www.hotellaroccasm.com" style="color:#C5A059;text-decoration:none;">www.hotellaroccasm.com</a> &bull; hotellarocca@omniway.sm
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
  };
}

// ==============================================================================
// VERCEL SERVERLESS HANDLER
// ==============================================================================
export default async function handler(req, res) {
  // Consenti solo richieste POST
  if (req.method !== 'POST') {
    res.writeHead(303, { Location: '/' });
    return res.end();
  }

  try {
    // 1. Parsing dati POST da urlencoded o json
    let data = req.body;
    if (typeof data === 'string') {
      data = querystring.parse(data);
    } else if (Buffer.isBuffer(data)) {
      data = querystring.parse(data.toString('utf-8'));
    } else if (!data && req.readable) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      data = querystring.parse(raw);
    }

    data = data || {};

    // 2. Controllo Honeypot Anti-Spam
    if (data.website) {
      res.writeHead(303, { Location: '/' });
      return res.end();
    }

    // 3. Risoluzione URL di reindirizzamento in base alla lingua
    const lang = (data.lang || 'it').toLowerCase();
    let redirectUrl = '/grazie';
    if (lang === 'en') redirectUrl = '/en/grazie';
    else if (lang === 'de') redirectUrl = '/de/grazie';
    else if (lang === 'fr') redirectUrl = '/fr/grazie';

    // 4. Preparazione Email
    const hotelHtml = generaEmailHotel(data);
    const clientData = generaEmailCliente(data);
    const clientEmail = data.email;

    // 5. Configurazione Transporter SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // 6. Invio Email 1 (Hotel) & Email 2 (Cliente) in parallelo
    const emailPromises = [];

    // Notifica all'hotel
    emailPromises.push(
      transporter.sendMail({
        from: `"Hotel La Rocca Sito Web" <${SMTP_USER}>`,
        to: DESTINATARIO_HOTEL,
        replyTo: clientEmail ? `"${data.nome_cognome || 'Ospite'}" <${clientEmail}>` : undefined,
        subject: `Nuova Richiesta Preventivo – ${data.camera_selezionata || 'Camera'} | Hotel La Rocca`,
        html: hotelHtml
      }).catch(err => console.error("Errore invio email hotel:", err))
    );

    // Conferma al cliente se ha inserito un'email valida
    if (clientEmail && clientEmail.includes('@')) {
      emailPromises.push(
        transporter.sendMail({
          from: `"Hotel La Rocca" <${SMTP_USER}>`,
          to: clientEmail,
          replyTo: "hotellarocca@omniway.sm",
          subject: clientData.subject,
          html: clientData.html
        }).catch(err => console.error("Errore invio email cliente:", err))
      );
    }

    // Attendiamo l'invio con timeout di sicurezza di 4 secondi
    await Promise.race([
      Promise.all(emailPromises),
      new Promise(resolve => setTimeout(resolve, 4000))
    ]);

    // 7. Reindirizzamento alla pagina grazie
    res.writeHead(303, { Location: redirectUrl });
    return res.end();

  } catch (error) {
    console.error("Errore handler Vercel:", error);
    // In caso di errore imprevisto, reindirizziamo comunque a grazie per garantire la migliore UX
    res.writeHead(303, { Location: '/grazie' });
    return res.end();
  }
}
