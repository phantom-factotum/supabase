import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../hooks/useThemeReducer';
export const saveData = async (data: object) => {
  Object.entries(data).forEach(async ([name, value]) => {
    let dataToSave = removeUnsaveables(value);
    if (!isValidObject(dataToSave)) {
      // console.log('Could not save', name);
      return;
    }
    // console.log("saving", name);
    // console.log(dataToSave);
    await AsyncStorage.setItem(name, JSON.stringify(dataToSave));
  });
};

export const getData = async () => {
  const keys = ['theme'];
  const data = await AsyncStorage.multiGet(keys);
  const [themeData]: [Theme] = data.map((val: [number, string]) =>
    JSON.parse(val[1])
  );
  return { themeData };
};
const removeUnsaveables = <T extends Object>(obj: T) => {
  if (!obj) return {};
  const newObject: any = {};
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val == 'function') return;
    try {
      JSON.stringify(val);
      newObject[key] = val;
    } catch (err) {
      console.log('Unserializable value');
    }
  });
  return newObject;
};

const isValidObject = (obj: object) =>
  Boolean(obj) && Object.keys(obj).length > 0;
