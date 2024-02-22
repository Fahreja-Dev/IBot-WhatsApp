export function multiGeminiAi(api, number, condition) {
  if (condition) {
    const randomApi = api[`api${number}`];

    const resultApi = {
      apiKeyGeminiAi: randomApi[0],
    };

    return resultApi;
  } else {
    return api;
  }
}

export function switchApiGeminiAi(api1, api2, condition) {
  if (condition) {
    return api2;
  } else {
    return api1;
  }
}
