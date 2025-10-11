import { generateId } from "@/helpers/generateId.ts";
import dayjs from "dayjs";

export class Habit {
  id: string;
  name: string;
  bestStreak: number;
  imgCover: string;
  frequency: string;
  timesPerDay: number;
  durationPerSession: number;
  scheduledWeekDays: number[];
  scheduledMonthlyDays: number[];
  reminderTime?: string;
  startDate: string = dayjs().format("YYYY-MM-DD");
  doneDays: string[] = [];
  private __streak: number;
  private __progressToday: number = 0;
  private __lastCompletedDate?: string;

  constructor(
    name: string,
    imgCover: string,
    timesPerDay: number,
    durationPerSession: number,
    frequency: string,
    scheduledWeekDays: number[],
    scheduledMonthlyDays: number[],
    reminderTime?: string,
  ) {
    this.id = generateId();
    this.name = name;
    this.__streak = 0;
    this.bestStreak = 0;
    this.imgCover = imgCover;
    this.frequency = frequency;
    this.timesPerDay = timesPerDay;
    this.durationPerSession = durationPerSession;
    this.scheduledWeekDays = scheduledWeekDays;
    this.scheduledMonthlyDays = scheduledMonthlyDays;
    this.reminderTime = reminderTime;
  }

  get progressToday() {
    return `${this.__progressToday}/${this.timesPerDay}`;
  }

  get isDone() {
    return this.__progressToday === this.timesPerDay;
  }

  get streak() {
    return this.__streak;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(obj: any): Habit {
    const habit = new Habit(
      obj.name,
      obj.imgCover,
      obj.timesPerDay,
      obj.durationPerSession,
      obj.frequency,
      obj.scheduledWeekDays,
      obj.scheduledMonthlyDays,
      obj.reminderTime,
    );
    habit.id = obj.id;
    habit.bestStreak = obj.bestStreak;
    habit.startDate = obj.startDate;
    habit.doneDays = obj.doneDays;
    habit.checkStreak();
    habit.__progressToday = obj.__progressToday;
    habit.__streak = obj.__streak;
    habit.__lastCompletedDate = obj.__lastCompletedDate;
    return habit;
  }

  hasToDoToday(): boolean {
    if (this.frequency === "daily") return true;

    const today = dayjs().get("day");
    if (this.frequency === "weekly")
      return this.scheduledWeekDays.includes(today);
    if (this.frequency === "monthly")
      return this.scheduledMonthlyDays.includes(today);
    return false;
  }

  toggleDone() {
    if (this.__lastCompletedDate !== dayjs().format("YYYY-MM-DD")) {
      this.__lastCompletedDate = dayjs().format("YYYY-MM-DD");
      this.__progressToday = 1;
    } else {
      this.__progressToday++;
    }

    if (
      this.__progressToday === this.timesPerDay &&
      this.doneDays.includes(this.__lastCompletedDate)
    ) {
      this.doneDays.push(this.__lastCompletedDate);
      this.__streak++;
      this.bestStreak = Math.max(this.bestStreak, this.__streak);
    }
  }

  // Should be called when load the app
  checkStreak() {
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    if (this.doneDays.at(-1) !== yesterday) {
      this.resetStreak();
    }
  }

  private resetStreak() {
    this.__streak = 0;
  }
}
