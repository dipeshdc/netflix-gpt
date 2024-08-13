const msg = await client.messages.stream({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      temperature:0,
    });
    console.log(msg);
  }