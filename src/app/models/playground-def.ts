export class PlaygroundDef {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  passportIndex: number;
  restroom: string;
  splashpad: boolean;

  constructor() {
    this.id = '';
    this.name = '';
    this.imageUrl = '';
    this.address = '';
    this.latitude = 0;
    this.longitude = 0;
    this.passportIndex = 9999;
    this.restroom = 'None';
    this.splashpad = false;
  }

  static sortDefsByDistance(
    defArray: PlaygroundDef[],
    coords: GeolocationCoordinates
  ): PlaygroundDef[] {
    return defArray.sort((a, b) => {
      return (
        PlaygroundDef.distanceToCoords(a, coords) -
        PlaygroundDef.distanceToCoords(b, coords)
      );
    });
  }

  static distanceToCoords(
    def: PlaygroundDef,
    coords: GeolocationCoordinates | undefined
  ): number {
    if (!coords) {
      return 999;
    }

    return PlaygroundDef.distanceToLatLong(
      def,
      coords.latitude,
      coords.longitude
    );
  }

  static distanceToLatLong(
    def: PlaygroundDef,
    latitude: number,
    longitude: number
  ): number {
    return PlaygroundDef.calculateDistance(
      def.latitude,
      latitude,
      def.longitude,
      longitude
    );
  }

  static calculateDistance(
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number
  ): number {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth. Use 3956
    // for miles, 6371 for kilometers.
    let r = 3956;

    // calculate the result
    return c * r;
  }
}
