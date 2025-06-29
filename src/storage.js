export async function toLocalStorage(key, value) {
  try {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
    // console.log(`Stored ${key} in localStorage`);
  } catch (error) {
    console.error(`Failed to store ${key} in localStorage:`, error.message);
    throw new Error(`Failed to store ${key} in localStorage`);
  }
}

export async function fromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      // console.warn(`No value found for key: ${key}`);
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  } catch (error) {
    console.error(
      `Failed to retrieve ${key} from localStorage:`,
      error.message
    );
    throw new Error(`Failed to retrieve ${key} from localStorage`);
  }
}

export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    // console.log(`Removed ${key} from localStorage`);
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error.message);
    throw new Error(`Failed to remove ${key} from localStorage`);
  }
}
