import {Structure} from "../structure/structure";

export class Event {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  street: string;
  city: string;
  zip: string;
  longitude: string;
  latitude: string;
  createdAt: Date;
  updatedAt: Date;
  organizer: Structure;
  price: number;
  audience: string;
}
