export const categories = [
  {
    _id: "5d5bb46e75af8bb30d000578",
    name: "Household"
  },
  {
    _id: "5d5bb4f80e940230bcbdc1ce",
    name: "Computers"
  },
  {
    _id: "5d5bb50b0e940230bcbdc1cf",
    name: "Watches"
  },
  {
    _id: "5d5bb5330e940230bcbdc1d0",
    name: "Smartphones"
  },
  {
    _id: "5d5ccc60eef8a730cc35daaf",
    name: "TV"
  }
];

export function getCategories() {
  return categories.filter(g => g);
}
