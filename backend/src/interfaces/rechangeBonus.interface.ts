import { Model, Document } from "mongoose";

export interface IRechangeBonus {
  name: string;
  amount: number;
  bonus: number;
}

export interface IRechangeBonusDoc extends IRechangeBonus, Document {}

export interface IRechangeBonusModel extends Model<IRechangeBonusDoc> {}

export type UpdateRechangeBonusBody = {
  name: string;
  amount: number;
  bonus: number;
};
