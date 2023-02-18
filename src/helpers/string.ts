export const getRandomChars = (len: number) => {
  let str = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  while (str.length < len) {
    let index = getRandom(0, characters.length);
    str += characters[index];
  }
  return str;
};
export const getRandom = (min = 0, max = 1) => {
  let range = max - min;
  return Math.random() * range + min;
};
export const getRandomint = (min: number, max: number) =>{
  return Math.floor(getRandom(min, max));
}
export const isValidEmail = (email:string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};
