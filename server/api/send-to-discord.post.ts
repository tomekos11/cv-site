type InquiryBody = {
  name?: string;
  surname?: string;
  company?: string;
  email?: string;
  content?: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<InquiryBody>(event);

  if (!body?.email || !body?.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email i content są wymagane!',
    });
  }

  const webhookUrl = process.env.NUXT_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook URL nie jest ustawiony!',
    });
  }

  try {
    await $fetch(webhookUrl, {
      method: 'POST',
      body: {
        embeds: [
          {
            title: 'Zapytanie ze strony od CV',
            fields: [
              { name: 'Imie', value: body.name || '---', inline: false },
              { name: 'Nazwisko', value: body.surname || '---', inline: false },
              { name: 'Firma', value: body.company || '---', inline: false },
              { name: 'Email', value: body.email, inline: false },
              { name: 'Treść', value: body.content, inline: false },
            ],
            color: 5814783,
          },
        ],
      },
    });

    return { success: true };
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Nie udało się wysłać wiadomości do Discorda.',
    });
  }
});
