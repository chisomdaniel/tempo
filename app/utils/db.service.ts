import { type Task, type QuickTask } from "../shared/types";

export class DBservice {
  private static instance: DBservice;
  private store: Task[] = [];
  private quickStore: QuickTask[] = [];
  private lastId: number = 0;
  private lastQuickId: number = 0;
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
      
      const savedQuickTasks = localStorage.getItem("quickTasks");
      const savedQuickId = localStorage.getItem("lastQuickId");

      if (savedId) {
        this.lastId = Number(savedId);
      }
      if (savedQuickId) {
        this.lastQuickId = Number(savedQuickId);
      }

      if (savedTasks) {
        try {
          this.store = JSON.parse(savedTasks);
        } catch (e) {
          console.error("Failed to parse tasks from localStorage", e);
        }
      }
      
      if (savedQuickTasks) {
        try {
          this.quickStore = JSON.parse(savedQuickTasks);
        } catch (e) {
          console.error("Failed to parse quickTasks from localStorage", e);
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

  public async getQuickTasks(): Promise<QuickTask[]> {
    await this.init();
    return this.quickStore;
  }

  public async addQuickTask(data: Omit<QuickTask, "id">): Promise<void> {
    await this.init();

    const newQuickTask = { ...data, id: this.lastQuickId++ };
    this.quickStore.push(newQuickTask);

    if (typeof window !== "undefined") {
      localStorage.setItem("lastQuickId", this.lastQuickId.toString());
      localStorage.setItem("quickTasks", JSON.stringify(this.quickStore));
    }
  }
}

export default DBservice.getInstance();
