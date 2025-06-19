export type InfoRow = {
  id: string;
  name: string;
  value: string | { id: number; name: string }[];
};
