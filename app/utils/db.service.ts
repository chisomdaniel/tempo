import { type Task } from "../shared/types";

export class DBservice {
  private static instance: DBservice;
  private store: Task[] = [];
  private lastId: number = 0;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): DBservice {
    if (!DBservice.instance) {
      DBservice.instance = new DBservice();
    }
    return DBservice.instance;
  }

  private async init(): Promise<void> {
    if (this.initialized) return;
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      const savedTasks = localStorage.getItem("tasks");
      const savedId = localStorage.getItem("lastId");

      if (savedId) {
        this.lastId = Number(savedId);
      }

      if (savedTasks) {
        try {
          this.store = JSON.parse(savedTasks);
        } catch (e) {
          console.error("Failed to parse tasks from localStorage", e);
        }
      }
      this.initialized = true;
      resolve();
    });
  }

  public async getAllData(): Promise<Task[]> {
    await this.init();
    this.store = this.store.sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );
    return this.store;
  }

  public async addData(data: Task): Promise<void> {
    await this.init();

    data.id = this.lastId++;
    this.store.push(data);

    if (typeof window !== "undefined") {
      localStorage.setItem("lastId", this.lastId.toString());
      localStorage.setItem("tasks", JSON.stringify(this.store));
    }
  }
}

export default DBservice.getInstance();
