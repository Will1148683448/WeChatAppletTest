// 定义一些常量
const pi = 3.14159265358979324;
const a = 6378245.0;
const ee = 0.00669342162296594323;

// 判断是否在中国境内
function outOfChina(lat, lon) {
  if (lon < 72.004 || lon > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
}

// 转换经度
function transformLon(x, y) {
  let ret =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
  ret +=
    ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) *
      2.0) /
    3.0;
  return ret;
}

// 转换纬度
function transformLat(x, y) {
  let ret =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
  ret +=
    ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

// WGS84坐标系转GCJ02坐标系
export function wgs84ToGcj02(wgsLat, wgsLon) {
  if (outOfChina(wgsLat, wgsLon)) {
    return [wgsLat, wgsLon];
  }
  let dLat = transformLat(wgsLon - 105.0, wgsLat - 35.0);
  let dLon = transformLon(wgsLon - 105.0, wgsLat - 35.0);
  const radLat = (wgsLat / 180.0) * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
  const gcjLat = wgsLat + dLat;
  const gcjLon = wgsLon + dLon;
  return { latitude: gcjLat, longitude: gcjLon };
}

// GCJ02坐标系转WGS84坐标系
export function gcj02ToWgs84(gcjLat, gcjLon) {
  if (outOfChina(gcjLat, gcjLon)) {
    return [gcjLat, gcjLon];
  }
  let dLat = transformLat(gcjLon - 105.0, gcjLat - 35.0);
  let dLon = transformLon(gcjLon - 105.0, gcjLat - 35.0);
  const radLat = (gcjLat / 180.0) * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
  const wgsLat = gcjLat - dLat;
  const wgsLon = gcjLon - dLon;
  return { latitude: wgsLat, longitude: wgsLon };
}
