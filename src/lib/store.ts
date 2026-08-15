import { useSyncExternalStore } from "react";

import laptopBag from "@/assets/item-laptop-bag.jpg";
import idCard from "@/assets/item-id-card.jpg";
import bottle from "@/assets/item-bottle.jpg";
import calculator from "@/assets/item-calculator.jpg";
import keys from "@/assets/item-keys.jpg";
import wallet from "@/assets/item-wallet.jpg";
import book from "@/assets/item-book.jpg";
import earbuds from "@/assets/item-earbuds.jpg";

export type ItemStatus = "lost" | "found";
export type ReportStatus = "pending" | "approved" | "rejected" | "returned";

export interface Item {
  id: string;
  status: ItemStatus;
  name: string;
  category: string;
  description: string;
  date: string;
  location: string;
  photo?: string | undefined;
  personName: string;
  contact: string;
  reportStatus: ReportStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
}

export const CATEGORIES = [
  "Electronics",
  "Books & Notes",
  "ID Card",
  "Wallet & Money",
  "Keys",
  "Clothing",
  "Bag",
  "Water Bottle",
  "Jewellery",
  "Other",
];

const ITEMS_KEY = "clf_items_v2";
const USERS_KEY = "clf_users_v1";
const SESSION_KEY = "clf_session_v1";

const seedItems: Item[] = [
  {
    id: "i1",
    status: "lost",
    name: "Black Dell Laptop Bag",
    category: "Bag",
    description:
      "Black laptop backpack with a broken side zip. Contains a charger and BCA notes.",
    date: "2026-08-11",
    location: "Library, 2nd Floor",
    photo: laptopBag,
    personName: "Aditya Sharma",
    contact: "9876543210",
    reportStatus: "approved",
    createdAt: "2026-08-11T10:00:00.000Z",
  },
  {
    id: "i2",
    status: "found",
    name: "Student ID Card - Priya Verma",
    category: "ID Card",
    description: "College ID card found near the canteen counter. BCA 1st semester.",
    date: "2026-08-12",
    location: "Main Canteen",
    photo: idCard,
    personName: "Rahul Yadav",
    contact: "9123456780",
    reportStatus: "approved",
    createdAt: "2026-08-12T09:30:00.000Z",
  },
  {
    id: "i3",
    status: "lost",
    name: "Blue Water Bottle",
    category: "Water Bottle",
    description: "Steel blue Milton bottle with a small dent at the bottom.",
    date: "2026-08-13",
    location: "Computer Lab 3",
    photo: bottle,
    personName: "Sneha Gupta",
    contact: "9988776655",
    reportStatus: "approved",
    createdAt: "2026-08-13T12:10:00.000Z",
  },
  {
    id: "i4",
    status: "found",
    name: "Casio Scientific Calculator",
    category: "Electronics",
    description: "Casio fx-991 calculator found on a bench in the maths classroom.",
    date: "2026-08-13",
    location: "Room 204",
    photo: calculator,
    personName: "Mohd Furkan",
    contact: "9229641044",
    reportStatus: "approved",
    createdAt: "2026-08-13T15:45:00.000Z",
  },
  {
    id: "i5",
    status: "found",
    name: "Bunch of Keys with Red Keyring",
    category: "Keys",
    description: "Three keys attached to a red keyring, found in the parking area.",
    date: "2026-08-14",
    location: "Bike Parking",
    photo: keys,
    personName: "Karan Singh",
    contact: "9001122334",
    reportStatus: "pending",
    createdAt: "2026-08-14T08:20:00.000Z",
  },
  {
    id: "i6",
    status: "lost",
    name: "Brown Leather Wallet",
    category: "Wallet & Money",
    description: "Brown wallet containing an Aadhaar card and a bus pass.",
    date: "2026-08-14",
    location: "Sports Ground",
    photo: wallet,
    personName: "Ankit Patel",
    contact: "9556677889",
    reportStatus: "approved",
    createdAt: "2026-08-14T17:05:00.000Z",
  },
  {
    id: "i7",
    status: "found",
    name: "C Programming Textbook",
    category: "Books & Notes",
    description: "Let Us C book with the name 'Riya' written on the first page.",
    date: "2026-08-10",
    location: "Library Reading Hall",
    photo: book,
    personName: "Divya Nair",
    contact: "9445566778",
    reportStatus: "returned",
    createdAt: "2026-08-10T11:00:00.000Z",
  },
  {
    id: "i8",
    status: "lost",
    name: "Black Wireless Earbuds",
    category: "Electronics",
    description: "boAt earbuds in a black charging case, lost during the lunch break.",
    date: "2026-08-09",
    location: "Auditorium",
    photo: earbuds,
    personName: "Harsh Meena",
    contact: "9334455667",
    reportStatus: "approved",
    createdAt: "2026-08-09T13:25:00.000Z",
  },
];

const seedUsers: User[] = [
  {
    id: "u1",
    name: "Admin Desk",
    email: "admin@campus.edu",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u2",
    name: "Aditya Sharma",
    email: "aditya@student.edu",
    password: "student123",
    role: "student",
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full - ignore */
  }
}

interface State {
  items: Item[];
  users: User[];
  session: User | null;
}

let state: State = { items: seedItems, users: seedUsers, session: null };
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = {
    items: read(ITEMS_KEY, seedItems),
    users: read(USERS_KEY, seedUsers),
    session: read<User | null>(SESSION_KEY, null),
  };
  write(ITEMS_KEY, state.items);
  write(USERS_KEY, state.users);
  emit();
}

function setState(patch: Partial<State>) {
  state = { ...state, ...patch };
  if (patch.items) write(ITEMS_KEY, state.items);
  if (patch.users) write(USERS_KEY, state.users);
  if ("session" in patch) write(SESSION_KEY, state.session);
  emit();
}

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const serverSnapshot: State = { items: seedItems, users: seedUsers, session: null };

export function useStore(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => serverSnapshot,
  );
}

export function addItem(data: Omit<Item, "id" | "createdAt" | "reportStatus">) {
  const item: Item = {
    ...data,
    id: `i${Date.now()}`,
    createdAt: new Date().toISOString(),
    reportStatus: "pending",
  };
  setState({ items: [item, ...state.items] });
  return item;
}

export function updateReportStatus(id: string, reportStatus: ReportStatus) {
  setState({
    items: state.items.map((i) => (i.id === id ? { ...i, reportStatus } : i)),
  });
}

export function deleteItem(id: string) {
  setState({ items: state.items.filter((i) => i.id !== id) });
}

export function registerUser(name: string, email: string, password: string) {
  const exists = state.users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { error: "An account with this email already exists." };
  const user: User = { id: `u${Date.now()}`, name, email, password, role: "student" };
  setState({ users: [...state.users, user], session: user });
  return { user };
}

export function loginUser(email: string, password: string) {
  const user = state.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) return { error: "Invalid email or password." };
  setState({ session: user });
  return { user };
}

export function logoutUser() {
  setState({ session: null });
}

export function deleteUser(id: string) {
  setState({ users: state.users.filter((u) => u.id !== id) });
}

export function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
