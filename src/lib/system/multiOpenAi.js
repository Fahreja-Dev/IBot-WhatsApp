export function multiOpenAi(api, number, condition) {
  if (condition) {
    const randomApi = api[`api${number}`];

    const resultApi = {
      apiKey: randomApi[0],
      organization: randomApi[1],
    };

    return resultApi;
  } else {
    return api;
  }
}

export function switchApiOpenAi(api1, api2, condition) {
  if (condition) {
    return api2;
  } else {
    return api1;
  }
}
