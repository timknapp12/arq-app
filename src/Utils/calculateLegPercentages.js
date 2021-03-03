// this function is to calculate the max QOV per leg based on what the
// current user's QOV is per each leg

export const calculateLegPercentages = (user, requirements) => {
  let leg1Max = requirements.legMaxOV;
  let leg2Max = requirements.legMaxOV;
  let leg3Max;
  // lower levels with 60% max
  if (requirements.legMaxPerc === 60) {
    // start with 100% of possible QOV per required rank
    let remainingPerc = 100;
    // get the user's QOV percentage of FIRST leg of the requirement
    let perc1 = ((user.leg1OV / requirements.requiredQOV) * 100).toFixed(0);
    if (perc1 >= 60) {
      perc1 = 60;
      remainingPerc -= perc1;
    } else {
      remainingPerc -= perc1;
    }
    // calculate the max possible QOV of the SECOND leg based on percentage of first leg
    leg2Max =
      remainingPerc >= 60
        ? requirements.legMaxOV
        : requirements.requiredQOV * (remainingPerc / 100);
    // get the user's QOV percentage of SECOND leg of the requirement
    let perc2 = ((user.leg2OV / requirements.requiredQOV) * 100).toFixed(0);
    if (perc2 >= 40) {
      perc2 = 40;
      remainingPerc -= perc2;
    } else {
      remainingPerc -= perc2;
    }
    // calculate the max possible QOV of the THIRD leg based on percentage of first leg
    leg3Max = requirements.requiredQOV * (remainingPerc / 100);
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  } else {
    // higher levels with 50% or 40% max - basically the same as above but only the THIRD leg possible QOV needs to be calculated
    let remainingPerc = 100;
    let perc1 = ((user.leg1OV / requirements.requiredQOV) * 100).toFixed(0);
    if (perc1 >= requirements.legMaxPerc) {
      perc1 = requirements.legMaxPerc;
      remainingPerc -= perc1;
    } else {
      remainingPerc -= perc1;
    }
    let perc2 = ((user.leg2OV / requirements.requiredQOV) * 100).toFixed(0);
    if (perc2 >= requirements.legMaxPerc) {
      perc2 = requirements.legMaxPerc;
      remainingPerc -= perc2;
    } else {
      remainingPerc -= perc2;
    }
    leg3Max = requirements.requiredQOV * (remainingPerc / 100);
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  }
};
