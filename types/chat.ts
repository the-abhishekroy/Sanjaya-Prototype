export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface SoilData {
  pH: number;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  moisture: string;
}