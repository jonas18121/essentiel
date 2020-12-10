import {Structure} from "../structure/structure";

export class Event {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  organizer: Structure;
}
