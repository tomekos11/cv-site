export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  if (!body.email || !body.content) {
    return { error: 'Email i content są wymagane!' };
  }
  
  const webhookUrl = process.env.NUXT_DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    return { error: 'Webhook URL nie jest ustawiony!' };
  }
  
  try {
    const response = await $fetch(webhookUrl, {
      method: 'POST',
      body: {
        embeds: [
          {
            title: 'Zapytanie ze strony od CV',
            fields: [
              { name: 'Imie', value: body.name, inline: false },
              { name: 'Nazwisko', value: body.surname, inline: false },
              { name: 'Firma', value: body.company || '---', inline: false },
              { name: 'Email', value: body.email, inline: false },
              { name: 'Treść', value: body.content, inline: false },
            ],
            color: 5814783,
          },
        ],
      },
    });
  
    return { success: true, response };
  } catch (error) {
    return { error: 'Nie udało się wysłać wiadomości do Discorda.' };
  }
});
  