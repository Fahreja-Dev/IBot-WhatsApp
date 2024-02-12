export function filtersMessage(user, menu) {
  const validationMessage = user.substring(0, 1);

  if (validationMessage === ".") {
    for (const item of menu) {
      const searchObject = new RegExp(item, "g");
      const findObject = user.match(searchObject);

      if (findObject !== null && user.search(item) === 0) {
        const findMessage = user.substring(item.length, user.length).trim();
        findObject.push(findMessage);
        const deleteObjectPoint = item.replace(".", "");

        const objectMessage = {
          keyMessage: deleteObjectPoint,
          message: findMessage,
        };

        return objectMessage;
      }
    }
  }
}
