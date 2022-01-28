export function findYear(y) {
  let year = "";
  if (y == 21) {
    year = "I";
  } else if (y == 20) {
    year = "II";
  } else if (y == 19) {
    year = "III";
  } else {
    year = "IV";
  }
  return year;
}

export function findDep(d) {
  console.log(typeof d);
  let dep = "";

  switch (d) {
    case "01":
      dep = "CS";
      break;
    case "02":
      dep = "ECE";
      break;

    case "03":
      dep = "EEE";
      break;

    case "04":
      dep = "MECH";
      break;

    case "05":
      dep = "IT";
      break;

    case "06":
      dep = "EIE";
      break;

    case "07":
      dep = "BME";
      break;

    case "08":
      dep = "AERO";
      break;

    case "09":
      dep = "CIVIL";
      break;
    case "10":
      dep = "R&A";
      break;

    case "11":
      dep = "AIDS";
      break;

    case "53":
      dep = "MTECH CSE";
      break;
  }
  console.log(dep);
  return dep;
}

export function findSection(s) {
  let section = "";
  if (s == 0) {
    section = "A";
  } else if (s == 1) {
    section = "B";
  } else if (s == 2) {
    section = "C";
  } else if (s == 3) {
    section = "D";
  } else if (s == 4) {
    section = "E";
  } else if (s == 5) {
    section = "F";
  }
  return section;
}
