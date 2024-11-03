export async function sleep(delay = 1500) {
  return await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
