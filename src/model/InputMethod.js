class inputMethod {
  static F10_MAP = new inputMethod("F10 Map");
  static FILE = new inputMethod("From file");
  static MANUAL = new inputMethod("Manual Entry");

  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

export default inputMethod;
