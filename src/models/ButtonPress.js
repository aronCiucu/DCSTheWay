const createButtonPress = (
  device,
  code,
  delay,
  activate = 1,
  addDepress = true,
) => ({
  device,
  code,
  delay,
  activate,
  addDepress: addDepress.toString(),
});

export default createButtonPress;
