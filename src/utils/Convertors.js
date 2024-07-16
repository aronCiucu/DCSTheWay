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

  static decimalToMGRS(Lat, Long) {
    // source: https://stackoverflow.com/questions/46728319/how-to-convert-between-lat-long-and-mgrs-using-javascript-without-dependence-on
    if (Lat < -80) return "Too far South";
    if (Lat > 84) return "Too far North";
    const c = 1 + Math.floor((Long + 180) / 6);
    const e = c * 6 - 183;
    const k = (Lat * Math.PI) / 180;
    const l = (Long * Math.PI) / 180;
    const m = (e * Math.PI) / 180;
    const n = Math.cos(k);
    const o = 0.006739496819936062 * Math.pow(n, 2);
    const p = 40680631590769 / (6356752.314 * Math.sqrt(1 + o));
    const q = Math.tan(k);
    const r = q * q;
    const t = l - m;
    const u = 1.0 - r + o;
    const v = 5.0 - r + 9 * o + 4.0 * (o * o);
    const w = 5.0 - 18.0 * r + r * r + 14.0 * o - 58.0 * r * o;
    const x = 61.0 - 58.0 * r + r * r + 270.0 * o - 330.0 * r * o;
    const y = 61.0 - 479.0 * r + 179.0 * (r * r) - r * r * r;
    const z = 1385.0 - 3111.0 * r + 543.0 * (r * r) - r * r * r;
    let aa =
      p * n * t +
      (p / 6.0) * Math.pow(n, 3) * u * Math.pow(t, 3) +
      (p / 120.0) * Math.pow(n, 5) * w * Math.pow(t, 5) +
      (p / 5040.0) * Math.pow(n, 7) * y * Math.pow(t, 7);
    let ab =
      6367449.14570093 *
        (k -
          0.00251882794504 * Math.sin(2 * k) +
          0.00000264354112 * Math.sin(4 * k) -
          0.00000000345262 * Math.sin(6 * k) +
          0.000000000004892 * Math.sin(8 * k)) +
      (q / 2.0) * p * Math.pow(n, 2) * Math.pow(t, 2) +
      (q / 24.0) * p * Math.pow(n, 4) * v * Math.pow(t, 4) +
      (q / 720.0) * p * Math.pow(n, 6) * x * Math.pow(t, 6) +
      (q / 40320.0) * p * Math.pow(n, 8) * z * Math.pow(t, 8);
    aa = aa * 0.9996 + 500000.0;
    ab = ab * 0.9996;
    if (ab < 0.0) ab += 10000000.0;
    const ad = "CDEFGHJKLMNPQRSTUVWXX".charAt(Math.floor(Lat / 8 + 10));
    const ae = Math.floor(aa / 100000);
    const af = ["ABCDEFGH", "JKLMNPQR", "STUVWXYZ"][(c - 1) % 3].charAt(ae - 1);
    const ag = Math.floor(ab / 100000) % 20;
    const ah = ["ABCDEFGHJKLMNPQRSTUV", "FGHJKLMNPQRSTUVABCDE"][
      (c - 1) % 2
    ].charAt(ag);

    function pad(val) {
      if (val < 10) {
        val = "0000" + val;
      } else if (val < 100) {
        val = "000" + val;
      } else if (val < 1000) {
        val = "00" + val;
      } else if (val < 10000) {
        val = "0" + val;
      }
      return val;
    }
    aa = Math.floor(aa % 100000);
    aa = pad(aa);
    ab = Math.floor(ab % 100000);
    ab = pad(ab);
    return c + ad + " " + af + ah + " " + aa + " " + ab;
  }
}

export default Convertors;
