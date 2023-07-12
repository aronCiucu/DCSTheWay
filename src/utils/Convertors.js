class Convertors {
  static decimalToDMM(decimalCoordinate) {
    const deg = Math.abs(Math.trunc(decimalCoordinate));
    const min = Number("0." + decimalCoordinate.toString().split(".")[1]) * 60;
    return { deg, min };
  }

  static decimalToDMS(decimalCoordinate) {
    const deg = Math.trunc(decimalCoordinate);
    const minDec =
      Number("0." + decimalCoordinate.toString().split(".")[1]) * 60;
    const min = Math.trunc(minDec);
    const sec = Math.trunc(Number("0." + minDec.toString().split(".")[1]) * 60);
    return { deg, min, sec };
  }

  static mToF(m) {
    return m * 3.280839895;
  }

  static fToM(f) {
    return f / 3.280839895;
  }
}

export default Convertors;
