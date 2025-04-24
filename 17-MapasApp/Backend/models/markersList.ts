import { Marker } from "./marker";

export class MarkersList {
  public markers = new Map<string, Marker>();

  addMarker(marker: Marker) {
    this.markers.set(marker.id, marker);
    return marker;
  }

  removeMarker(id: string) {
    this.markers.delete(id);
  }

  updateMarker(marker: Marker) {
    this.markers.set(marker.id, marker);
    return marker;
  }
}
