// this function is to calculate the max QOV per leg based on what the
// current user's QOV is per each leg

export const calculateLegPercentages = (user, requirements) => {
  let leg1Max = requirements.maximumPerLeg;
  let leg2Max = requirements.maximumPerLeg;
  let leg3Max = requirements.maximumPerLeg;
  // lower levels with 60% max
  if (requirements.legMaxPercentage === 60) {
    // start with 100% of possible QOV per required rank
    // let remainingPerc = 100;
    // get the user's QOV percentage of FIRST leg of the requirement
    let perc1 = Math.round((user.leg1 / requirements.minimumQoV) * 100);
    if (perc1 >= 60) {
      perc1 = 60;
    }
    if (perc1 < 20) {
      perc1 = 20;
    }
    // remainingPerc -= perc1;
    // calculate the max possible QOV of the SECOND leg based on percentage of first leg
    // leg2Max =
    //   remainingPerc >= 60
    //     ? requirements.maximumPerLeg
    //     : requirements.minimumQoV * (remainingPerc / 100);
    // get the user's QOV percentage of SECOND leg of the requirement
    let perc2 = Math.round((user.leg2 / requirements.minimumQoV) * 100);
    if (perc2 >= 40) {
      perc2 = 40;
    }
    if (perc2 < 20) {
      perc2 = 20;
    }
    // remainingPerc -= perc2;

    // calculate the max possible QOV of the THIRD leg based on percentage of first two legs
    // leg3Max = requirements.minimumQoV * (remainingPerc / 100);

    // if the points are over the max for each leg, then just return the points as the max
    leg1Max = user.leg1 > leg1Max ? user.leg1 : leg1Max;
    leg2Max = user.leg2 > leg2Max ? user.leg2 : leg2Max;
    leg3Max = user.leg3 > leg3Max ? user.leg3 : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  } else if (requirements.legMaxPercentage === 50) {
    // mid levels with 50% max - basically the same as above but only the THIRD leg possible QOV needs to be calculated
    // let remainingPerc = 100;
    let perc1 = Math.round((user.leg1 / requirements.minimumQoV) * 100);
    if (perc1 >= 50) {
      perc1 = 50;
    }
    if (perc1 < 25) {
      perc1 = 25;
    }
    // remainingPerc -= perc1;

    let perc2 = Math.round((user.leg2 / requirements.minimumQoV) * 100);
    if (perc2 >= 50) {
      perc2 = 50;
    }
    if (perc2 < 25) {
      perc2 = 25;
    }
    // remainingPerc -= perc2;

    // leg3Max = requirements.minimumQoV * (remainingPerc / 100);

    // if the points are over the max for each leg, then just return the points as the max
    leg1Max = user.leg1 > leg1Max ? user.leg1 : leg1Max;
    leg2Max = user.leg2 > leg2Max ? user.leg2 : leg2Max;
    leg3Max = user.leg3 > leg3Max ? user.leg3 : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  } else {
    // higher levels with 40% max
    // let remainingPerc = 100;
    let perc1 = Math.round((user.leg1 / requirements.minimumQoV) * 100);
    if (perc1 >= 40) {
      perc1 = 40;
    }
    if (perc1 < 34) {
      perc1 = 34;
    }
    // remainingPerc -= perc1;

    let perc2 = Math.round((user.leg2 / requirements.minimumQoV) * 100);
    if (perc2 >= 40) {
      perc2 = 40;
    }
    if (perc2 < 34) {
      perc2 = 33;
    }
    // remainingPerc -= perc2;

    // leg1Max = requirements.minimumQoV * (perc1 / 100);
    // leg2Max = requirements.minimumQoV * (perc2 / 100);
    // leg3Max = requirements.minimumQoV * (remainingPerc / 100);

    // if the points are over the max for each leg, then just return the points as the max
    leg1Max = user.leg1 > leg1Max ? user.leg1 : leg1Max;
    leg2Max = user.leg2 > leg2Max ? user.leg2 : leg2Max;
    leg3Max = user.leg3 > leg3Max ? user.leg3 : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  }
};

export const reshapePerc = (min, max) => {
  let result = Math.round((min / max) * 100);
  if (result > 100) {
    result = 100;
  }
  return result;
};
