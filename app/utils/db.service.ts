import { type Task } from "../shared/types";

const LASTID = 0;

function _idGenerator() {
  let id = LASTID;
  return function () {
    return id++;
  };
}

const generateId = _idGenerator();

export class DBservice {
  private static instance: DBservice;
  private store: Task[] = [];

  private constructor() {}

  public static getInstance(): DBservice {
    if (!DBservice.instance) {
      DBservice.instance = new DBservice();
    }
    return DBservice.instance;
  }

  public async getAllData(): Promise<Task[]> {
    this.store = this.store.sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );
    return this.store;
  }

  public async addData(data: Task): Promise<void> {
    data.id = generateId();
    this.store.push(data);
  }
}

export default DBservice.getInstance();
