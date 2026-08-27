import { harbourLine } from "../data/harbourLine";

export function getRoute(source, destination) {
  const sourceIndex = harbourLine.indexOf(source);
  const destinationIndex = harbourLine.indexOf(destination);

  if (sourceIndex === -1 || destinationIndex === -1) {
    return [];
  }

  if (sourceIndex < destinationIndex) {
    return harbourLine.slice(
      sourceIndex,
      destinationIndex + 1
    );
  }

  return harbourLine
    .slice(destinationIndex, sourceIndex + 1)
    .reverse();
}