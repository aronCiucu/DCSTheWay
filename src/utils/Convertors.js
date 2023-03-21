class Convertors {
  static decimalToDMM(decimalCoordinate) {
    const deg = Math.trunc(decimalCoordinate);
    const min = Number("0." + decimalCoordinate.toString().split(".")[1]) * 60;
    return { deg, min };
  }

  static mToF(m) {
    return m * 3.280839895;
  }
  static fToM(f) {
    return f / 3.280839895;
  }
}

export default Convertors;
