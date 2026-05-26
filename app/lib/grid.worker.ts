import { getGrid } from './grid';
import type { Geometry } from 'geojson';

self.onmessage = (e: MessageEvent<Geometry>) => {
    const grid = getGrid(e.data);
    self.postMessage(grid);
};
