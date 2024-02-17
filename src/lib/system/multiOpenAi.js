export function multiOpenAi(api, number, condition) {
  if (condition) {
    const randomApi = api[`api${number}`];

    const resultApi = {
      apiKeyOpenAi: randomApi[0],
      organizationOpenAi: randomApi[1],
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
