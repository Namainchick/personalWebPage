export type TrashItem = {
  id: string;
  name: string;
  deletedAt: string;
  /** Empty string when no screenshot exists; renders a generic file icon. */
  src: string;
  note: string;
};

export const trash: TrashItem[] = [
  {
    id: "greenhouse",
    name: "Greenhouse (Jun 2026).png",
    deletedAt: "2026-09-02",
    src: "/img/trash/greenhouse-2026-06.jpg",
    note: "Pale green, very polite, very quiet. Nam said: boring.",
  },
  {
    id: "bento",
    name: "Bento (Feb 2026).png",
    deletedAt: "2026-06-25",
    src: "",
    note: "Teal and coral cards on warm beige. Maximum density, removed after four months.",
  },
];
