import { Band } from "./band";

export class BandList {
  private bands: Band[] = [new Band("Metallica"), new Band("MCR")];

  public addBand(name: string) {
    return this.bands.push(new Band(name));
  }

  public removeBand(id: string) {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  public get getBands() {
    return this.bands;
  }

  public increaseVotes(id: string) {
    const band = this.bands.find((band) => band.id === id);
    if (band) band.votes += 1;
    return this.bands;
  }

  public changeName(id: string, newName: string) {
    const band = this.bands.find((band) => band.id === id);
    console.log(band);
    if (band) band.name = newName;
    return this.bands;
  }
}
