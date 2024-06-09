interface CustomStorage {
  data: Record<string, string>;

  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

const customStorage: CustomStorage = {
  data: {},

  setItem(key: string, value: string): Promise<void> {
    this.data[key] = value;
    return Promise.resolve();
  },

  getItem(key: string): Promise<string | null> {
    return Promise.resolve(this.data[key] || null);
  },

  removeItem(key: string): Promise<void> {
    delete this.data[key];
    return Promise.resolve();
  },

  clear(): Promise<void> {
    this.data = {};
    return Promise.resolve();
  }
};

export default customStorage;
