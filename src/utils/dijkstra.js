export function dijkstra(graph, start) {
  const distances = {};
  const visited = {};
  const previous = {};

  for (const node in graph) {
    distances[node] = Infinity;
    visited[node] = false;
    previous[node] = null;
  }

  distances[start] = 0;

  for (let i = 0; i < Object.keys(graph).length; i++) {
    let closestNode = null;

    for (const node in distances) {
      if (
        !visited[node] &&
        (closestNode === null ||
          distances[node] <
            distances[closestNode])
      ) {
        closestNode = node;
      }
    }

    visited[closestNode] = true;

    for (const neighbor in graph[closestNode]) {
      const distance =
        distances[closestNode] +
        graph[closestNode][neighbor];

      if (
        distance <
        distances[neighbor]
        ) {
        distances[neighbor] =
            distance;

        previous[neighbor] =
            closestNode;
        }
    }
  }

  return {
    distances,
    previous,
    };
}