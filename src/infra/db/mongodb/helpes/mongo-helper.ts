import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(url: string): Promise<void> {
    this.uri = url;
    this.client = await MongoClient.connect(url);
  },
  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null;
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
  map(data: any): any {
    const { _id, ...rest } = data;
    return Object.assign({}, rest, { id: _id.toHexString() });
  },
  mapCollection(collection: any[]): any[] {
    return collection.map((c) => MongoHelper.map(c));
  },
};
