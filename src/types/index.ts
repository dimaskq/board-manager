export interface Contact {
  id: string;
  name: string;
  position: string;
  company: string;
  location: string;
  interests: string;
}

export interface Board {
  id: string;
  name: string;
  contacts: Contact[];
}

export interface AppData {
  boards: Board[];
}
